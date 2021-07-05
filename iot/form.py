# -*- coding: utf-8 -*-
import json
import time
import random
import requests
from PyQt5 import QtCore, QtWidgets


class Ui_MainWindow(object):
    def setupUi(self, MainWindow):
        MainWindow.setObjectName("MainWindow")
        MainWindow.resize(372, 150)
        self.centralwidget = QtWidgets.QWidget(MainWindow)
        self.centralwidget.setObjectName("centralwidget")
        self.lineID = QtWidgets.QLineEdit(self.centralwidget)
        self.lineID.setGeometry(QtCore.QRect(120, 30, 141, 20))
        self.lineID.setObjectName("lineID")

        self.pushButton = QtWidgets.QPushButton(self.centralwidget)
        self.pushButton.setGeometry(QtCore.QRect(140, 70, 91, 31))
        self.pushButton.setObjectName("pushButton")

        self.label = QtWidgets.QLabel(self.centralwidget)
        self.label.setGeometry(QtCore.QRect(40, 30, 58, 13))
        self.label.setObjectName("label")

        MainWindow.setCentralWidget(self.centralwidget)
        self.menubar = QtWidgets.QMenuBar(MainWindow)
        self.menubar.setGeometry(QtCore.QRect(0, 0, 372, 21))
        self.menubar.setObjectName("menubar")
        MainWindow.setMenuBar(self.menubar)
        self.statusbar = QtWidgets.QStatusBar(MainWindow)
        self.statusbar.setObjectName("statusbar")
        MainWindow.setStatusBar(self.statusbar)

        self.retranslateUi(MainWindow)
        QtCore.QMetaObject.connectSlotsByName(MainWindow)

        self.pushButton.clicked.connect(self.getRandomValues)

    def retranslateUi(self, MainWindow):
        _translate = QtCore.QCoreApplication.translate
        MainWindow.setWindowTitle(_translate("MainWindow", "BeHealthy"))
        self.pushButton.setText(_translate("MainWindow", "Почати збiр"))
        self.label.setText(_translate("MainWindow", "ID пацiєнта"))

    def getRandomValues(self):
        _id = self.lineID.text()
        while True:
            data = self.generateVal(_id)
            self.sendData(data, _id)

    def generateVal(self, _id):
        t_min = 35.0
        t_max = 40.0
        pulse_min = 80
        pulse_max = 160

        temperature = '%.1f'%(random.uniform(t_min, t_max))
        pulse = random.randrange(pulse_min, pulse_max+1)
        # Генерация json строки
        data = '{\"pulse\": \"' + str(pulse) + '\", \"temperature\": \"' + str(temperature) + '\"}\r\n'
        return data

    def sendData(self, data, _id):
        # Сбор данных и отправка на веб-сервер

        headers = {
            'Content-Type': 'application/json'
        }
        
        # Отправка json строки на url
        url = 'http://localhost:5000/pulse/' + _id
        print(url)
       # x = requests.session()
       # x.config['keep_alive'] = False
        x = requests.request("POST", url, headers=headers, data = data, verify=False)
        # x - это ответ от веб-сервера
        # print(x.text)
        time.sleep(3)

if __name__ == "__main__":
    import sys
    app = QtWidgets.QApplication(sys.argv)
    MainWindow = QtWidgets.QMainWindow()
    ui = Ui_MainWindow()
    ui.setupUi(MainWindow)
    MainWindow.show()
    sys.exit(app.exec_())
