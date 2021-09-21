# credit-scoring-florence
Predict whether the client will default or not after their loan application.

## API Endpoint
- **POST** /predict
- Example: https://local-host/predict

### Headers:
- **Content-Type**: application/json

### Body Params:
Field | Description | Value | Required
------|-------------|-------|---------
person_age | Age. | Integer | Yes
person_income | Annual Income. | Integer | Yes 
person_home_ownership | Home ownership. | 'RENT', 'MORTGAGE', 'OWN', or 'OTHER' | Yes
person_emp_length | Employment length (in years) | Integer | Yes
loan_intent | Loan intent. | 'PERSONAL', 'EDUCATION', 'MEDICAL', 'VENTURE', 'HOMEIMPROVEMENT', or 'DEBTCONSOLIDATION' | Yes
loan_grade | Loan grade. | 'A', 'B', 'C, 'D', 'E', 'F', or 'G' | Yes
loan_amnt | Loan amount. | Integer | Yes
loan_int_rate | Interest rate. | Float | Yes
loan_percent_income | Percent income. | Float (Between 0 and 1) | Yes
cb_person_default_on_file | Historical default. | 'Y', or 'N' | Yes
cb_person_cred_hist_length | Credit history length. | Integer | Yes

### Examples:

```
{
    "person_age": 27,
    "person_income": 47900,
    "person_home_ownership": "OWN",
    "person_emp_length": 1,
    "loan_intent": "VENTURE",
    "loan_grade": "C",
    "loan_amnt": 7500,
    "loan_int_rate": 13.47,
    "loan_percent_income": 0.16,
    "cb_person_default_on_file": "N",
    "cb_person_cred_hist_length": 6
}
```

## Response
Field | Description
------|------------
api_version | The machine learning model.
model_version | Model version.
result | Probability estimates.

```
{'api_version': 'v1', 'model_version': 'credit_scoring_1.0.0', 'result': '0.513'}
```

### Missing Value handling:
- Missing values: `person_age`, `person_income`, `person_emp_length`, `loan_amnt`, `loan_int_rate`, `loan_percent_income`, or `cb_person_cred_hist_length` will be mapped to `np.nan`.

### Handling outliers:
- I let the oultier as it since handling it with Weight of Evidence (WOE) do not increase the performance
