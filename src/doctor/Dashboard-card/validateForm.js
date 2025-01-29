export const validateForm = (data) => {
    const errors = {};
    let formIsValid = true;

    //patient details form
    if (data.updatePatientData) {
        if (!data.updatePatientData.name) {
            errors.name = "Enter name";
            formIsValid = false;
        }
        if (!data.updatePatientData.age) {
            errors.age = "Enter age";
            formIsValid = false;
        }
        const gender = data.saveGender || data.updatePatientData.gender;
        if (!gender) {
            errors.gender = "Enter gender";
            formIsValid = false;
        }
    }
    //patient details form
    if (data.dependentData) {
        if (!data.dependentData.name) {
            errors.name = "Enter name";
            formIsValid = false;
        }
        if (!data.dependentData.age) {
            errors.age = "Enter age";
            formIsValid = false;
        }
        const gender = data.saveGender || data.dependentData.gender;
        if (!gender) {
            errors.gender = "Enter gender";
            formIsValid = false;
        }
    }

    //start consultation general info
    if (data.changeData) {
        if (!data.changeData.age) {
            errors.age = "Enter age";
            formIsValid = false;
        }
        if (!data.changeData.weight) {
            errors.weight = "Enter weight";
            formIsValid = false;
        }
        if (!data.changeData.height) {
            errors.height = "Enter height";
            formIsValid = false;
        }
    }
    //start consultation symptoms
    if (data.saveSymptoms) {
        if (!data.saveSymptoms || data.saveSymptoms.length === 0) {
            errors.symptoms = "Select symptoms";
            formIsValid = false;
        }
    }
    //start consultation Treatment
    if (data.saveServices) {
        if (!data.saveServices || !data.saveServices.name) {
            errors.treatment = "Select treatment";
            formIsValid = false;
        }
    }

    //start consultation lab prescription
    if (data.saveLabData) {
        if (!data.saveLabData || !data.saveLabData.test_name) {
            errors.labTest = "Select lab test";
            formIsValid = false;
        }

    }
    return { formIsValid, errors };
};