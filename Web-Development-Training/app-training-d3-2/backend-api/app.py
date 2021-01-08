from flask import Flask, request, redirect, render_template, jsonify
from sklearn import datasets
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import precision_score, recall_score
import numpy as np
app = Flask(__name__)
data1 = [
    {"group": "A", "value": 4},
    {"group": "B", "value": 16},
    {"group": "C", "value": 8}
]

maxValue = 0

for item in data1:
    if item["value"] >= maxValue:
        maxValue = item["value"]
maxValue_orig = maxValue

#Softmax model, I will try to overfit to the data because the simulation isn't exactly real. Because you can make unrealistic dimnsions of flower from the iris family.
iris_dataset = datasets.load_iris(as_frame=True)
X_iris = iris_dataset['data']
y_iris = iris_dataset['target']
lrModel = LogisticRegression(multi_class='multinomial', solver='lbfgs', C=10, max_iter=50)#C=1\lambda using L2-norm.
lrModel.fit(X_iris, y_iris)

setosa_train = (y_iris == 0)
versicolor_train = (y_iris == 1)
virginica_train = (y_iris == 2)

prediction = lrModel.predict(X_iris)
setosa_pred = ( prediction== 0)
versicolor_pred = (prediction == 1)
virginica_pred = (prediction == 2)

prec_setosa = precision_score(setosa_train, setosa_pred)
recall_setosa = recall_score(setosa_train, setosa_pred)

prec_versicolor = precision_score(versicolor_train, versicolor_pred)
recall_versicolor = recall_score(versicolor_train, versicolor_pred)

prec_virginica = precision_score(virginica_train, virginica_pred)
recall_virginica = recall_score(virginica_train, virginica_pred)




@app.route('/example1data', methods=['POST'])
def getExample1Data():
    global maxValue
    global data1
    group = request.form.get('group')
    value = request.form.get('value')
    reset = request.form.get('reset')
    print('Reset', reset)

    if str(reset) == "true":
        global data1
        global maxValue
        maxValue = maxValue_orig
        data1 = [
                {"group": "A", "value": 4},
                {"group": "B", "value": 16},
                {"group": "C", "value": 8}
                ]
        return jsonify({"Data": data1, "max": maxValue_orig})
    else:
        if group == '' and value == '':
            return jsonify({"Data": data1, "max": maxValue})

        flag = False
        for item in data1:
            if item["group"].upper() == group.upper():
                flag = True
                item["value"] += int(value)
                item["value"] = max([item["value"], 0])
                if(item["value"] >= maxValue):
                    maxValue = item["value"]
                break

        if not flag:
            value = max([int(value), 0])
            data1.append({"group": str(group), "value": value})
            if(data1[-1]["value"] >= maxValue):
                    maxValue = data1[-1]["value"]
        return jsonify({"Data": data1, "max": maxValue})

@app.route('/example2data', methods=['POST'])
def classifyFlowe():
    print('PR Setosa: ', prec_setosa,' RR Setosa:',recall_setosa)
    print('PR Versicolor: ', prec_versicolor,' RR Versicolor:',recall_versicolor)
    print('PR Virginica: ', prec_virginica,' RR Setosa:',recall_virginica)
    pw = float(request.form.get('PW'))
    pl = float(request.form.get('PL'))
    sw = float(request.form.get('SW'))
    sl = float(request.form.get('SL'))
    print(sl, ' ',sw)
    print(iris_dataset.target_names[lrModel.predict([[sl, sw, pl, pw]])])
    return jsonify({'SL': sl, 'SW': sw, 'PL': pl, 'PW': pw, 'class': iris_dataset.target_names[lrModel.predict([[sl, sw, pl, pw]])][0]})

__data_2__  = []
for sl, sw, pw, pl, c in zip(list(X_iris['sepal length (cm)']), list(X_iris['sepal width (cm)']), list(X_iris['petal width (cm)']), list(X_iris['petal length (cm)']), list(iris_dataset.target_names[y_iris])):
    __data_2__.append({'sl': sl, 'sw': sw, 'pw': pw, 'pl':pl, 'c': c})

@app.route('/getExample2Data', methods=['GET'])
def getData2():
    global __data_2__
    return jsonify({'data': __data_2__})