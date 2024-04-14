//
exports.trainAndPredict = function (req, res) {
    const tf = require('@tensorflow/tfjs');
    //require('@tensorflow/tfjs-node');
    
    //load diseases training and testing data
    const dis = require('../../DiseasesOutput.json');
    const disTesting = require('../../DiseasesOutput-test.json');
    console.log(disTesting)
    //
        
    //tensor of features for training data
    console.log('trainingData')
    const trainingData = tf.tensor2d(dis.map(item => [
        item.name,
        item.text,
        item.laytext,
        item.category,
        item.alias,
        item.wiki1,
        item.wiki2,
        item.wiki3,
        item.wiki4,
        item.IsRare,
        item.IsGenderSpecific,
        item.Risk,
        item.IsCantMiss,
        item.ICD10,
        item.LOINC
    ]))
    //
    //tensor of output for training data
    //console.log(trainingData.dataSync())
    //
    //tensor of output for training data
    //the values for species will be:
    // Is Life Threatening 1:       1,0 //yes true
    // Is Life Threatening 2:       0,1 //no false
    const outputData = tf.tensor2d(dis.map(item => [
        item.IsImmLifeThreatening === 1 ? 1 : 0,
        item.IsImmLifeThreatening === 2 ? 1 : 0
    ]))
    console.log('Output Data: ---------')
    console.log(outputData.dataSync())

     //
    //tensor of features for testing data
    const testingData = tf.tensor2d(disTesting.map(item => [
        item.name,
        item.text,
        item.laytext,
        item.category,
        item.alias,
        item.wiki1,
        item.wiki2,
        item.wiki3,
        item.wiki4,
        item.IsRare,
        item.IsGenderSpecific,
        item.Risk,
        item.IsCantMiss,
        item.ICD10,
        item.LOINC
    ]))
    // console.log(testingData.dataSync())
    // testingData.array().then(array => {
    //     console.log(array)
    // })

    // build neural network using a sequential model
    const model = tf.sequential()
    //add the first layer
    model.add(tf.layers.dense({
        inputShape: [15], // 19 input neurons (features)
        activation: "sigmoid",
        units: 25, //dimension of output space (first hidden layer) - changed to 25 neurons
    }))
    //add the first hidden layer
    model.add(tf.layers.dense({
        inputShape: [30], //dimension of hidden layer (2/3 rule)
        activation: "sigmoid",
        units: 10, //dimension of second hidden layer - changed to 10 from 15
    }))
    //add the second hidden layer
    model.add(tf.layers.dense({
        inputShape: [13], //dimension of hidden layer (2/3 rule)
        activation: "sigmoid",
        units: 2, //dimension of final output (die or live)
    }))
    //add output layer
    model.add(tf.layers.dense({
        activation: "sigmoid",
        units: 2, //dimension of final output
    }))
    //compile the model with an MSE loss function and Adam algorithm
    model.compile({
        //categoricalCrossentropy
        loss: "meanSquaredError",
        optimizer: tf.train.adam(.001), //is a new algorithm - changing learning rate from 0.003 to 0.001
        metrics: ['accuracy'],
    })

    console.log(model.summary())
    // train/fit the model for the fixed number of epochs
  

    async function run() {
        const startTime = Date.now()
        //train the model using fit method
        await model.fit(trainingData, outputData,
            {
                epochs: 500, //# of iterations
                callbacks: {
                    onEpochEnd: async (epoch, log) => {
                        console.log(`Epoch ${epoch}: loss = ${log.loss}`);
                        const endTime = Date.now(); // updated variabe name
                        elapsedTime = endTime - startTime;
                        console.log('elapsed time: ' + elapsedTime)
                    }
                }
            }

        ) //fit
        // predict using predict method
        const results = model.predict(testingData);
        results.print()
        // get the values from the tf.Tensor
        //var tensorData = results.dataSync();
        results.array().then(array => {
            console.log(array)
            var resultForTest1 = array[0];
            var resultForTest2 = array[1];
            var resultForTest3 = array[2];
            var dataToSent = {row1: resultForData1,row2: resultForData2, row3: resultForData3}
            console.log(disTesting);
            // uncommment this when client is React
           // res.status(200).send(dataToSent);

            res.render('results',
                {
                    elapsedTime: elapsedTime,
                    lossValue: lossValue,
                    resultForTest1: resultForTest1,
                    resultForTest2: resultForTest2,
                    resultForTest3: resultForTest3
                }
            )
        })
    } //end of run function
    run()
    //

};
