from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('postgres://jorzhcaxijshws:a399999444da0837dc9d6b4c362f33be25fe0bb1d03001d54843f75b93233b2e@ec2-35-172-85-250.compute-1.amazonaws.com/d6pspujea2rin9', convert_unicode=True)
db_session = scoped_session(sessionmaker(autocommit=False,
                                         autoflush=False,
                                         bind=engine))
Base = declarative_base()
Base.query = db_session.query_property()

def init_db():
    # import all modules here that might define models so that
    # they will be registered properly on the metadata.  Otherwise
    # you will have to import them first before calling init_db()
    import models.models
    Base.metadata.create_all(bind=engine)
