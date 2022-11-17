from flask import Flask
import numpy as np
import tensorflow as tf
import requests as request
import os
app = Flask(__name__)

os.environ['TF_FORCE_GPU_ALLOW_GROWTH'] = 'true'

text = open("./fine_tune_tweet.txt", encoding="utf8").read()
vocab = sorted(set(text))

# Creating a mapping from unique characters to indices
char2index = {u:i for i, u in enumerate(vocab)}
index2char = np.array(vocab)

text_as_int = np.array([char2index[c] for c in text])

# Batch size
BATCH_SIZE = 64

# Buffer size to shuffle the dataset
# (TF data is designed to work with possibly infinite sequences,
# so it doesn't attempt to shuffle the entire sequence in memory. Instead,
# it maintains a buffer in which it shuffles elements). 10000
BUFFER_SIZE = 10000

# Length of the vocabulary in chars
vocab_size = len(vocab)

# The embedding dimension
embedding_dim = 512 #256

# Number of RNN units
rnn_units1 = 1024 #1024
rnn_units2 = 512
rnn_units=[rnn_units1, rnn_units2]

def build_model(vocab_size, embedding_dim, rnn_units, BATCH_SIZE):
    model = tf.keras.Sequential([
        tf.keras.layers.Embedding(vocab_size, embedding_dim,
                                batch_input_shape=[BATCH_SIZE, None]),
        tf.keras.layers.GRU(rnn_units1,
                            return_sequences=True,
                            stateful=True,
                            recurrent_initializer='glorot_uniform'),
        tf.keras.layers.GRU(rnn_units2,
                            return_sequences=True,
                            stateful=True,
                            recurrent_initializer='glorot_uniform'),
        tf.keras.layers.Dense(vocab_size)
    ])
    return model

model = build_model(vocab_size = vocab_size,
embedding_dim=embedding_dim,
rnn_units=rnn_units,
BATCH_SIZE=BATCH_SIZE)

def loss(labels, logits):
    return tf.keras.losses.sparse_categorical_crossentropy(labels, logits, from_logits=True)

model.compile(optimizer='adam', loss=loss, metrics=['accuracy'])
checkpoint_dir = './training_checkpoints'
latest_check= tf.train.latest_checkpoint(checkpoint_dir)

model = build_model(vocab_size, embedding_dim, rnn_units, BATCH_SIZE=1)

model.load_weights(latest_check)

model.build(tf.TensorShape([1, None]))
model.compile(optimizer='adam', loss=loss)
print(model.summary())
@app.route("/predict/<pass_string>", methods = ['POST'])
def generate_text(pass_string):
    # Number of characters to generate
    num_generate = 1000
    print(pass_string)
    # Converting our start string to numbers (vectorizing)
    input_eval = [char2index[s] for s in pass_string]
    input_eval = tf.expand_dims(input_eval, 0)

    # Empty string to store our results
    text_generated = []

    # Low results in more predictable text.
    # Higher results in more surprising text.
    # Experiment to find the best setting.
    scaling = 0.5 #1

    # batch size == 1

    model.reset_states()
    for i in range(num_generate):
        predictions = model(input_eval)
        # remove the batch dimension
        predictions = tf.squeeze(predictions, 0)

        # using a categorical distribution to predict the character returned by the model
        predictions = predictions / scaling
        predicted_id = tf.random.categorical(predictions, num_samples=1)[-1,0].numpy()

        # We pass the predicted character as the next input to the model
        # along with the previous hidden state
        input_eval = tf.expand_dims([predicted_id], 0)

        text_generated.append(index2char[predicted_id])

    
    return (pass_string + ''.join(text_generated))
#print(generate_text(pass_string=u"nasdaq"))
if __name__ == '__main__':
    app.run(debug=True,use_reloader=False, port=8000)