from flask import Flask, render_template, request, jsonify
import json
from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from sqlalchemy.orm import sessionmaker
import bcrypt
from models.models import Questions, Options

app = Flask(__name__)
from settings.database import init_db, db_session
init_db()
session = db_session

@app.route('/')
def hello():
	return render_template('quiz.html')


@app.route('/get_questions')
def getQuestions():
	dat = []
	ques = session.query(Questions).all()
	for x in ques:
		opt = session.query(Options).filter(Options.question_id==x.id)
		dat.append(
			{
			'id': x.id,
			'question':x.question,
			'answer':x.answer,
			'options':[{'data': op.option, 'ischecked': False, 'isCorrect':True if x.answer==op.option else False} for op in opt]})
	data = [
		{'question':'What is the colour of sky?',
		'answer':'blue',
		'options':[
				{'data': 'white', 'ischecked':False, 'isCorrect': False},
				{'data': 'black', 'ischecked':False, 'isCorrect': False}, 
				{'data': 'green', 'ischecked':False, 'isCorrect': False}, 
				{'data': 'blue', 'ischecked': False, 'isCorrect': True}
				]
		},
		{'question':'What is the full form of HTML?',
		'answer':'Hyper Text Markup Language',
		'options':[
				{'data': 'Hyper Tension Markup League', 'ischecked':False, 'isCorrect': False},
				{'data': 'Hyper Text Machine Language', 'ischecked':False, 'isCorrect': False}, 
				{'data': 'Hyper Text Markup Language', 'ischecked':False, 'isCorrect': True}, 
				{'data': 'Hyper Transfer Machine Learning', 'ischecked': False, 'isCorrect': False}
				]
		},
		{'question':'What is the colour of danger signal?',
		'answer':'blue',
		'options':[
				{'data': 'white', 'ischecked':False, 'isCorrect': False},
				{'data': 'black', 'ischecked':False, 'isCorrect': False}, 
				{'data': 'red', 'ischecked':False, 'isCorrect': True}, 
				{'data': 'blue', 'ischecked': False, 'isCorrect': False}
				]
		}
	]
			# {'question':'What is Delhi?','answer':'city','options':['city','state','country','continent']},
			# {'question':'What is the full form of HTML?','answer':'Hyper Text Markup Language','options':['Hyper Text Machine Language','Hidden Text Machine Learning','Hyper Translated Markup Language','Hyper Transfer Middle Language']}]
	return json.dumps(data)

@app.route('/testing')
def testing():
	return render_template('testing.html')

@app.route('/createQuiz', methods=['GET', 'POST'])
def createQuiz():
	if request.method == 'POST':
		formData = json.loads(request.data)
		addQuestion = Questions(question=formData.get('Question'), answer=formData.get('Answer'))
		session.add(addQuestion)
		session.commit()
		for opt in range(0,4):
			session.add(Options(option=formData.get('Option'+str(opt+1)), question_id=addQuestion.id))
		session.commit()
		return jsonify(success=True)
	return render_template('createQuiz.html')

@app.route('/deleteQuestion/<id>',methods=['GET'])
def deleteQuestion(id):
	getOptions = session.query(Options).filter_by(question_id=id)
	getQuestion = session.query(Questions).filter_by(id=id)
	getOptions.delete()
	getQuestion.delete()
	session.commit()
	return 'fsffdg'

@app.route('/updateQuiz/<id>',methods=['GET','POST'])
def updateQuiz(id):
	if request.method == 'POST':
		import pdb;pdb.set_trace()
		formData = json.loads(request.data)
		ques_info = session.query(Questions).get(id)
		options_info = session.query(Options).filter_by(question_id=id)
		ques_info.question = formData.get('Question')
		ques_info.answer = formData.get('Answer')
		options_info[0].option = formData.get('Option1')
		options_info[1].option = formData.get('Option2')
		options_info[2].option = formData.get('Option3')
		options_info[3].option = formData.get('Option4')
		print(ques_info)
		print(options_info)
		session.commit()
		return jsonify(success=True)
	ques_info = session.query(Questions).get(id)
	options_info = session.query(Options).filter_by(question_id=id)
	return render_template('createQuiz.html',ques_info=ques_info,options_info=options_info,id=id)

@app.route('/allQuestions',methods=['GET'])
def allQuestions():
	return render_template('allQuestions.html')

@app.route('/login',methods=['GET'])
def login():
	return render_template('login.html')

@app.route('/postLogin',methods=['POST'])
def postLogin():
	login_details = json.loads(request.data)
	if login_details.get('username') == 'admin' and bcrypt.checkpw(login_details.get('password').encode('utf-8'), b'$2b$12$8Fb.Mhhiystk1pqNS5lyK.GlbTayO/amW/isE9Ns3DGii66uUhMKK'):
		return jsonify(success=True)
	else:
		return jsonify(success=False)

@app.route('/settings',methods=['GET'])
def settings():
	return render_template('settings.html')

@app.route('/selectQuestion',methods=['GET'])
def selectQuestion():
	return render_template('selectQuestion.html')
