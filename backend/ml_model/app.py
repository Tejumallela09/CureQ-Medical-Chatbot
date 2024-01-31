
import numpy as np
import pandas as pd
from sklearn import preprocessing
from sklearn.tree import DecisionTreeClassifier,_tree
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.model_selection import cross_val_score
from sklearn.svm import SVC
import csv
import warnings

from google_trans_new import google_translator
translator = google_translator()

training = pd.read_csv('Training.csv')
testing= pd.read_csv('Testing.csv')
cols= training.columns
cols= cols[:-1]
x = training[cols]
y = training['prognosis']
y1= y


reduced_data = training.groupby(training['prognosis']).max()

le = preprocessing.LabelEncoder()
le.fit(y)
y = le.transform(y)


x_train, x_test, y_train, y_test = train_test_split(x, y, test_size=0.33, random_state=42)
testx    = testing[cols]
testy    = testing['prognosis']
testy    = le.transform(testy)


clf1  = DecisionTreeClassifier()
clf = clf1.fit(x_train,y_train)
# print(clf.score(x_train,y_train))
# print ("cross result========")
scores = cross_val_score(clf, x_test, y_test, cv=3) # cv****
# print (scores)
#print (scores.mean())

importances = clf.feature_importances_
indices = np.argsort(importances)[::-1]
features = cols

'''def readn(nstr):
    engine = pyttsx3.init()

    engine.setProperty('voice', "english+f5")
    engine.setProperty('rate', 130)

    engine.say(nstr)
    engine.runAndWait()
    engine.stop()'''


severityDictionary=dict()
description_list = dict()
precautionDictionary=dict()

symptoms_dict = {}

for index, symptom in enumerate(x):
       symptoms_dict[symptom] = index
def calc_condition(exp,days):
    sum=0
    for item in exp:
         sum=sum+severityDictionary[item]
    if((sum*days)/(len(exp)+1)>13):
        print("You should take the consultation from doctor. ")
    else:
        print("It might not be that bad but you should take precautions.")


def getDescription():
    global description_list
    with open('symptom_Description.csv') as csv_file:
        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            _description={row[0]:row[1]}
            description_list.update(_description)




def getSeverityDict():
    global severityDictionary
    with open('Symptom_severity.csv') as csv_file:

        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        try:
            for row in csv_reader:
                _diction={row[0]:int(row[1])}
                severityDictionary.update(_diction)
        except:
            pass


def getprecautionDict():
    global precautionDictionary
    with open('symptom_precaution.csv') as csv_file:

        csv_reader = csv.reader(csv_file, delimiter=',')
        line_count = 0
        for row in csv_reader:
            _prec={row[0]:[row[1],row[2],row[3],row[4]]}
            precautionDictionary.update(_prec)



import re
from fuzzywuzzy import fuzz

import re
from fuzzywuzzy import fuzz

def check_pattern(dis_list, inp):
    pred_list = []
    threshold = 80


    custom_rules = {
        "stomach ache": ["stomach_pain"],
        "head ache": ["head_pain"],
        "skin rash": ["skin_rash"],
        "nodal skin eruptions": ["nodal_skin_eruptions"],
        "continuous sneezing": ["continuous_sneezing"],
        "sneezing": ["continuous_sneezing"],
        "shiver" : ["shivering"],
        "joint pain": ["joint_pain"],
        "muscle wasting": ["muscle_wasting"],
        "vomit": ["vomiting"],
        "burning micturition" : ["burning_micturition"],
        "burning" :["burning_micturition"],
        "burn" : ["burning_micturition"],
        "ulcers on tongue" : ["ulcers_on_tongue"],
        "ulcers": ["ulcers_on_tongue"],
        "spotting urination" : ["spotting_ urination"],
        "urination" : ["spotting_ urination"],
        "urine": ["spotting_ urination"],
        "frequent urination": ["spotting_ urination"],
        "dizzyness" : ["fatigue"],
        "weight gain": ["weight_gain"],
        "gaining weight": ["weight_gain"],
        "stress" : ["anxiety"],
        "cold hands and feets": ["cold_hands_and_feets"],
        "cold hands": ["cold_hands_and_feets"],
        "cold feet": ["cold_hands_and_feets"],
        "mood swings": ["mood_swings"],
        "weight loss": ["weight_loss"],
        "patches in throat": ["patches_in_throat"],
        "irregular sugar level": ["irregular_sugar_level"],
        "low or high sugar level": ["irregular_sugar_level"],
        "high or low sugar level": ["irregular_sugar_level"],
        "high sugar": ["irregular_sugar_level"],
        "low sugar": ["irregular_sugar_level"],
        "severe cough": ["cough"],
        "high fever": ["high_fever"],
        "fever": ["high_fever"],
        "sunken eyes": ["sunken_eyes"],
        "execess sweating": ["sweating"],
        "problem in digestion": ["indigestion"],
        "no digestion": ["indigestion"],
        "yellowish skin": ["yellowish_skin"],
        "yellow skin": ["yellowish_skin"],
        "head pain": ["headache"],
        "severe headache": ["headache"],
        "dark urine": ["dark_urine"],
        "loss of appetite": ["loss_of_appetite"],
        "no appetite": ["loss_of_appetite"],
        "pain behind the eyes": ["pain_behind_the_eyes"],
        "pain behind eyes": ["pain_behind_the_eyes"],
        "back pain": ["back_pain"],
        "abdominal pain": ["abdominal_pain"],
        "loose motions": ["diarrhoea"],
        "mild fever": ["mild_fever"],
        "yellow urine": ["yellow_urine"],
        "yellowing of eyes": ["yellowing_of_eyes"],
        "acute liver failure": ["acute_liver_failure"],
        "liver failure": ["acute_liver_failure"],
        "liver pain": ["acute_liver_failure"],
        "fluid overload": ["fluid_overload"],
        "swelling of stomach": ["swelling_of_stomach"],
        "stomach swelling": ["swelling_of_stomach"],
        "swelled lymph nodes": ["swelled_lymph_nodes"],
        "blurred and distorted vision": ["blurred_and_distorted_vision"],
        "blurred vision" : ["blurred_and_distorted_vision"],
        "distorted vision":["blurred_and_distorted_vision"],
        "throat irriation": ["throat_irritation"],
        "irritation in throat":["throat_irritation"],
        "throat pain": ["throat_irritation"],
        "redness of eyes": ["redness_of_eyes"],
        "red eyes": ["redness_of_eyes"],

    "sinus pressure": ["sinus_pressure"],
        "sinus": ["sinus_pressure"],
    "runny nose": ["runny_nose"],
    "congestion": ["congestion"],
    "chest pain": ["chest_pain"],
    "weakness in limbs": ["weakness_in_limbs"],
        "weak limbs": ["weakness_in_limbs"],
    "fast heart rate": ["fast_heart_rate"],
    "pain during bowel movements": ["pain_during_bowel_movements"],
    "pain in anal region": ["pain_in_anal_region"],
    "bloody stool": ["bloody_stool"],
    "irritation in anus": ["irritation_in_anus"],
    "neck pain": ["neck_pain"],
    "dizziness": ["dizziness"],
    "cramps": ["cramps"],
    "bruising": ["bruising"],
    "obesity": ["obesity"],
    "swollen legs": ["swollen_legs"],
    "swollen blood vessels": ["swollen_blood_vessels"],
    "puffy face and eyes": ["puffy_face_and_eyes"],
        "puffy face": ["puffy_face_and_eyes"],
        "puffy eyes": ["puffy_face_and_eyes"],
    "enlarged thyroid": ["enlarged_thyroid"],
        "thyroid": ["enlarged_thyroid"],
    "brittle nails": ["brittle_nails"],
    "swollen extremities": ["swollen_extremeties"],
    "excessive hunger": ["excessive_hunger"],
    "extra marital contacts": ["extra_marital_contacts"],
    "drying and tingling lips": ["drying_and_tingling_lips"],
    "slurred speech": ["slurred_speech"],
    "knee pain": ["knee_pain"],
    "hip joint pain": ["hip_joint_pain"],
    "muscle weakness": ["muscle_weakness"],
    "stiff neck": ["stiff_neck"],
    "swelling joints": ["swelling_joints"],
    "movement stiffness": ["movement_stiffness"],
    "spinning movements": ["spinning_movements"],
    "loss of balance": ["loss_of_balance"],
    "unsteadiness": ["unsteadiness"],
    "weakness of one body side": ["weakness_of_one_body_side"],
    "loss of smell": ["loss_of_smell"],
    "bladder discomfort": ["bladder_discomfort"],
    "foul smell of urine": ["foul_smell_of urine"],
    "continuous feel of urine": ["continuous_feel_of_urine"],
    "passage of gases": ["passage_of_gases"],
    "internal itching": ["internal_itching"],
    "toxic look (typhos)": ["toxic_look_(typhos)"],
    "depression": ["depression"],
    "irritability": ["irritability"],
    "muscle pain": ["muscle_pain"],
    "altered sensorium": ["altered_sensorium"],
    "red spots over body": ["red_spots_over_body"],
    "belly pain": ["belly_pain"],
    "abnormal menstruation": ["abnormal_menstruation"],
    "dischromic patches": ["dischromic_patches"],
    "watering from eyes": ["watering_from_eyes"],
    "increased appetite": ["increased_appetite"],
    "polyuria": ["polyuria"],
    "family history": ["family_history"],
    "mucoid sputum": ["mucoid_sputum"],
    "rusty sputum": ["rusty_sputum"],
    "lack of concentration": ["lack_of_concentration"],
    "visual disturbances": ["visual_disturbances"],
    "receiving blood transfusion": ["receiving_blood_transfusion"],
    "receiving unsterile injections": ["receiving_unsterile_injections"],
    "coma": ["coma"],
    "stomach bleeding": ["stomach_bleeding"],
    "distention of abdomen": ["distention_of_abdomen"],
    "history of alcohol consumption": ["history_of_alcohol_consumption"],
    "fluid overload.1": ["fluid_overload.1"],
    "blood in sputum": ["blood_in_sputum"],
    "prominent veins on calf": ["prominent_veins_on_calf"],
    "palpitations": ["palpitations"],
    "painful walking": ["painful_walking"],
    "pus-filled pimples": ["pus_filled_pimples"],
    "blackheads": ["blackheads"],
    "scurring": ["scurring"],
    "skin peeling": ["skin_peeling"],
    "silver like dusting": ["silver_like_dusting"],
    "small dents in nails": ["small_dents_in_nails"],
    "inflammatory nails": ["inflammatory_nails"],
    "blister": ["blister"],
    "red sore around nose": ["red_sore_around_nose"],
    "yellow crust ooze": ["yellow_crust_ooze"]
    }


    if inp.lower() in custom_rules:
        pred_list.extend(custom_rules[inp.lower()])
        return 1, pred_list


    for item in dis_list:

        similarity = fuzz.partial_ratio(inp, item)


        regex_match = re.search(re.escape(inp), item, re.IGNORECASE)

        if regex_match or similarity >= threshold:
            pred_list.append(item)

    if pred_list:
        return 1, pred_list
    else:
        return 0, inp


def sec_predict(symptoms_exp):
    df = pd.read_csv('Training.csv')
    X = df.iloc[:, :-1]
    y = df['prognosis']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.3, random_state=20)
    rf_clf = DecisionTreeClassifier()
    rf_clf.fit(X_train, y_train)

    symptoms_dict = {}

    for index, symptom in enumerate(X):
        symptoms_dict[symptom] = index

    input_vector = np.zeros(len(symptoms_dict))
    for item in symptoms_exp:
        input_vector[[symptoms_dict[item]]] = 1


    return rf_clf.predict([input_vector])


def print_disease(node):

    node = node[0]

    val  = node.nonzero()

    disease = le.inverse_transform(val[0])
    return disease
def tree_to_code(tree, feature_names, react_input=False):
    tree_ = tree.tree_

    feature_name = [
        feature_names[i] if i != _tree.TREE_UNDEFINED else "undefined!"
        for i in tree_.feature
    ]

    chk_dis=",".join(feature_names).split(",")
    symptoms_present = []



    while True:

        print("Enter the symptom you are experiencing", flush=True)

        disease_input = input()
        conf,cnf_dis=check_pattern(chk_dis,disease_input)
        if conf==1:

            for num,it in enumerate(cnf_dis):
                #print(num,")",it,flush=True)
                disease_input = it
            if num!=0:
                print(f"Select the one you meant (0 - {num}):  ", end="",flush=True)
                conf_inp = int(input())
            else:
                conf_inp=0

            disease_input=cnf_dis[conf_inp]
            break

        else:
            print("Enter valid symptom.",flush=True)


    while True:
        try:

            num_days=int(input("Okay. From how many days ?"))

            break
        except:
            print("Enter number of days.",flush=True)
    def recurse(node, depth):
        indent = "  " * depth
        if tree_.feature[node] != _tree.TREE_UNDEFINED:
            name = feature_name[node]
            threshold = tree_.threshold[node]

            if name == disease_input:
                val = 1
            else:
                val = 0
            if  val <= threshold:
                recurse(tree_.children_left[node], depth + 1)
            else:
                symptoms_present.append(name)
                recurse(tree_.children_right[node], depth + 1)
        else:
            present_disease = print_disease(tree_.value[node])

            red_cols = reduced_data.columns
            symptoms_exp = []
            symptoms_given = red_cols[reduced_data.loc[present_disease].values[0].nonzero()]


            symptoms_given = [symptom for symptom in symptoms_given if symptom not in symptoms_exp]

            print("Are you experiencing any (yes/no)",flush=True)

            for syms in list(symptoms_given):
                inp = ""
                if syms != disease_input:
                    print(syms, "? : ", end='',flush=True)
                    while True:
                        inp = input("")
                        if inp.lower() == "yes" or inp.lower() == "no":
                            break
                        else:
                            print("Provide proper answers i.e. (yes/no) : ",flush=True)

                        if inp.lower() == "yes":
                            symptoms_exp.append(syms)
            






            second_prediction = sec_predict(symptoms_exp)


            calc_condition(symptoms_exp,num_days)
            if(present_disease[0]==second_prediction[0]):
                print("You may have ", present_disease[0])

                print(description_list[present_disease[0]])


            else:
                print("You may have ", present_disease[0], "or ", second_prediction[0])
                print(description_list[present_disease[0]])
                print(description_list[second_prediction[0]])


            precution_list=precautionDictionary[present_disease[0]]
            print("Take following measures : ")
            for  i,j in enumerate(precution_list):
                print(i+1,")",j)

            confidence_level = (1.0*len(symptoms_present))/len(symptoms_given)




    recurse(0, 1)
getSeverityDict()
getDescription()
getprecautionDict()
tree_to_code(clf,cols, react_input=True)
print("Would you like to book an appointment?")
import pickle

# Save the trained model to a file
with open('decision_tree_model.pkl', 'wb') as model_file:
    pickle.dump(clf, model_file)
import sys

# Load the saved model from the pickle file
model_path = sys.argv[1]
with open(model_path, 'rb') as model_file:
    clf = pickle.load(model_file)
