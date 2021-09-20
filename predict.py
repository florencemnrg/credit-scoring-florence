import pickle
import numpy as np
import pandas as pd

raw_input = {'cb_person_cred_hist_length': 4,
 'cb_person_default_on_file': 0,
 'loan_amnt': 35000,
 'loan_grade': 6,
 'loan_int_rate': 10.37,
 'loan_intent': 'VENTURE',
 'loan_percent_income': 0.41,
 'person_age': 22,
 'person_emp_length': 6.0,
 'person_home_ownership': 'RENT',
 'person_income': 85000}

def preprocess_input(input_data):
    """ preprocess input data """

    input_data = pd.DataFrame.from_dict(input_data, orient='index')
    # print(input_data)
    return input_data


def make_predictions(input_data):
    """ function to make final prediction using pipeline """
    with open('trained_model/FE-SC-IMP-OHE-1.0.0.pkl', 'rb') as f:
        fe = pickle.load(f)

    with open('trained_model/M-LR-1.0.0.pkl', 'rb') as f:
        model = pickle.load(f)

    input_data = preprocess_input(input_data).T.replace({
        None: np.nan,
        "null": np.nan,
        "": np.nan
    })

    # define the order of features
    cols = ['person_age',
            'person_emp_length',
            'loan_int_rate',
            'loan_percent_income',
            'cb_person_cred_hist_length',
            'person_home_ownership',
            'loan_intent',
            'loan_grade',
            'cb_person_default_on_file']
    input_data = input_data[cols]
    # print(input_data)

    # Feature Engineering with pipeline
    input_data = fe.transform(input_data)

    # model prediction
    result = model.predict_proba(input_data)[:, 1]
    return result


if __name__ == "__main__":
    result = make_predictions(raw_input)
    # print(type(result))
    # print(result)
