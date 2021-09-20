from flask import Flask, request, jsonify, render_template
from predict import make_predictions, preprocess_input


app = Flask(__name__)


@app.route("/", methods=["GET"])
def default():
    return render_template("index.html")


@app.route('/predict', methods=['POST'])
def predict():
    if request.method == 'POST':
        data_input = request.get_json()

        data = {}
        data["person_age"] = [data_input.get('person_age')]
        data["person_emp_length"] = [data_input.get('person_emp_length')]
        data["loan_int_rate"] = [data_input.get('loan_int_rate')]
        data["loan_percent_income"] = [data_input.get('loan_percent_income')]
        data["cb_person_cred_hist_length"] = [data_input.get('cb_person_cred_hist_length')]
        data["person_home_ownership"] = [data_input.get('person_home_ownership')]
        data["loan_intent"] = [data_input.get('loan_intent')]
        data["loan_grade"] = [data_input.get('loan_grade')]
        data["cb_person_default_on_file"] = [data_input.get('cb_person_default_on_file')]

        result = make_predictions(data)

        result = {
                "model_version": "credit_scoring_1.0.0",
                "api_version": "v1",
                "result": str(round(list(result)[0], 3))
        }

    return jsonify(result)


if __name__ == "__main__":
    app.run(port=5555, debug=True)

