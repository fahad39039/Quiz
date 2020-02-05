from sqlalchemy import *
from sqlalchemy import Column, Integer, String, ForeignKey
from settings.database import Base


class Questions(Base):
	"""questions is created to store all the questions."""
	__tablename__ = 'questions'

	id = Column(Integer, primary_key=True)
	question = Column(String(100))
	answer = Column(String(100))

	def __repr__(self):
		return "<Questions(question='{0}', answer='{1}')>".format(self.question,self.answer)

class Options(Base):
	"""options is created to store options based on questionId """
	__tablename__ = 'options'

	id = Column(Integer,primary_key=True)
	option = Column(String(50))
	question_id = Column(Integer,ForeignKey('questions.id'))

	def __repr__(self):
		return "<Options(option='{0}', question_id='{1}')>".format(self.option,self.question_id)
