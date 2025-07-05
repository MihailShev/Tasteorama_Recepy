import { useEffect, useId, useState } from 'react';
import css from './AddRecipeForm.module.css';
import { MdOutlinePhotoCamera } from 'react-icons/md';
import { RiDeleteBin4Line } from 'react-icons/ri';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

export default function AddRecipeForm({ categories, ingredients }) {
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState('');
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const id = useId();
  const navigate = useNavigate();

  useEffect(() => {
    function handleResize() {
      setScreenWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const validation = Yup.object().shape({
    title: Yup.string('Title must be a string!')
      .max(64, 'Too long!')
      .required('Required!'),
    description: Yup.string('Description must be a string!')
      .max(200, 'Too long!')
      .required('Required!'),
    time: Yup.number('Cooking time must be a number!')
      .min(1, 'Cannot be less than or equal to 0')
      .max(360, 'Too long!')
      .required('Required!'),
    cals: Yup.number('Calories must be a number!')
      .min(1, 'Cannot be less than or equal to 0')
      .max(10000, 'Too long!'),
    category: Yup.string('Category must be a string!').required('Required!'),
    newIngredientName: Yup.string('Name of ingredient must be a string!'),
    newIngredientAmount: Yup.string('Measure must be a string!').trim(),
    ingredients: Yup.array()
      .of(
        Yup.object({
          id: Yup.string('Ingredients id must be a string!')
            .length(24, 'Too long!')
            .required('Required!'),
          measure: Yup.string('Measure must be a string!')
            .trim()
            .required('Required!'),
        })
      )
      .required('Required!'),
    instructions: Yup.string('Instructions must be a string!')
      .max(1200, 'Too long!')
      .required('Required!'),
  });

  function handleChangePhoto(event) {
    event.preventDefault();

    const file = event.target.files[0];
    const allowedFormats = ['jpg', 'jpeg', 'png'];

    if (file) {
      const givenFormat = event.target.value.toLowerCase().split('.').pop();
      if (allowedFormats.includes(givenFormat)) {
        const reader = new FileReader();
        reader.onload = function (event) {
          setPreview(event.target.result);
          setSelectedFile(file);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  const notify = message => toast.error(message);

  async function handleSubmit(values, actions) {
    delete values.newIngredientName;
    delete values.newIngredientAmount;
    values.ingredientAmount = values.ingredients.length;
    const normalizedIngredients = JSON.stringify(values.ingredients);
    values.ingredients = normalizedIngredients;
    const formData = new FormData();
    formData.append('thumb', selectedFile);
    const arrayOfKeys = Object.keys(values);
    for (let i = 0; i < arrayOfKeys.length; i += 1) {
      const data = arrayOfKeys[i];
      formData.append(data, values[data]);
    }
    try {
      // const response = await axios.post(
      //   'https://recepy-api.onrender.com/api/recipes',
      //   formData
      // );
      const response = await axios.post(
        'https://bufrufrbcbcyurfugveyvwei',
        formData
      );
      navigate(`/recipes/${response.data._id}`, { replace: true });
    } catch (error) {
      actions.resetForm();
      setPreview(null);
      setSelectedFile('');
      notify(error.message);
    }
  }

  return (
    <div className="container">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick={false}
        draggable
      />
      <h2 className={css.titleOfSection}>Add Recipe</h2>
      <Formik
        initialValues={{
          title: '',
          description: '',
          time: '',
          cals: '',
          category: 'Soup',
          newIngredientName: 'Squid',
          newIngredientAmount: '',
          ingredients: [],
          instructions: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={validation}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form className={css.addRecipeForm}>
            <div className={css.wrapper}>
              <div className={css.desktopPhoto}>
                <h3 className={css.uploadPhoto}>Upload Photo</h3>
                {!preview ? (
                  <label
                    className={css.uploadPhotoField}
                    htmlFor={`${id}-photo`}
                  >
                    <MdOutlinePhotoCamera
                      size={screenWidth >= 1440 ? '82' : '52'}
                    />
                  </label>
                ) : (
                  <label
                    className={css.uploadPhotoField}
                    style={{
                      background: `url(${preview})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundRepeat: 'no-repeat',
                    }}
                    htmlFor={`${id}-photo`}
                  />
                )}
                <Field
                  name="photo"
                  id={`${id}-photo`}
                  type="file"
                  className="visually-hidden"
                  onChange={event => handleChangePhoto(event)}
                />
              </div>
              <div className={css.mainFields}>
                <h3 className={css.generalInformation}>General information</h3>
                <label className={css.generalInfoLabel} htmlFor={`${id}-title`}>
                  Recipe Title
                </label>
                <Field
                  name="title"
                  id={`${id}-title`}
                  className={`${css.enterGeneralInfo} ${
                    errors.title && touched.title && css.errorField
                  }`}
                  placeholder="Enter the name of your recipe"
                />
                <ErrorMessage
                  className={css.errorMsg}
                  name="title"
                  component="span"
                />
                <label
                  className={css.generalInfoLabel}
                  htmlFor={`${id}-description`}
                >
                  Recipe Description
                </label>
                <Field
                  name="description"
                  id={`${id}-description`}
                  className={`${css.enterGeneralInfo} ${
                    errors.description && touched.description && css.errorField
                  }`}
                  rows="6"
                  as="textarea"
                  placeholder="Enter a brief description of your recipe"
                />
                <ErrorMessage
                  className={css.errorMsg}
                  name="description"
                  component="span"
                />
                <label
                  className={css.generalInfoLabel}
                  htmlFor={`${id}-cookingTime`}
                >
                  Cooking time in minutes
                </label>
                <Field
                  name="time"
                  id={`${id}-cookingTime`}
                  className={`${css.enterGeneralInfo} ${
                    errors.time && touched.time && css.errorField
                  }`}
                  placeholder="10"
                  type="number"
                />
                <ErrorMessage
                  className={css.errorMsg}
                  name="time"
                  component="span"
                />
                <div className={css.inlineFields}>
                  <label className={css.inlineGeneralInfoLabel}>
                    Calories
                    <Field
                      name="cals"
                      id={`${id}-calories`}
                      className={`${css.enterGeneralInfo} ${
                        errors.cals && touched.cals && css.errorField
                      }`}
                      placeholder="150 cals"
                      type="number"
                    />
                    <ErrorMessage
                      className={css.errorMsg}
                      name="cals"
                      component="span"
                    />
                  </label>

                  <label className={css.inlineGeneralInfoLabel}>
                    Category
                    <Field
                      name="category"
                      id={`${id}-category`}
                      className={`${css.enterGeneralInfo} ${
                        errors.category && touched.category && css.errorField
                      }`}
                      value={values.category}
                      as="select"
                    >
                      {categories.map(item => {
                        return (
                          <option key={item._id} value={item.name}>
                            {item.name}
                          </option>
                        );
                      })}
                    </Field>
                    <ErrorMessage
                      className={css.errorMsg}
                      name="category"
                      component="span"
                    />
                  </label>
                </div>
                <h3
                  className={`${css.generalInformation} ${css.ingredientsTitle}`}
                >
                  Ingredients
                </h3>
                <div className={css.ingredientSection}>
                  <label
                    className={`${css.generalInfoLabel} ${css.nameOfIngredient}`}
                    htmlFor={`${id}-ingredientName`}
                  >
                    Name
                    <Field
                      name="newIngredientName"
                      id={`${id}-ingredientName`}
                      className={`${css.enterGeneralInfo} ${
                        errors.newIngredientName &&
                        touched.newIngredientName &&
                        css.errorField
                      }`}
                      as="select"
                    >
                      <ErrorMessage
                        className={css.errorMsg}
                        name="newIngredientName"
                        component="span"
                      />
                      {ingredients.map(item => {
                        return (
                          <option
                            className="ingredientsName"
                            id={item._id}
                            key={item._id}
                            value={item.name}
                          >
                            {item.name}
                          </option>
                        );
                      })}
                    </Field>
                  </label>
                  <label
                    className={css.generalInfoLabel}
                    htmlFor={`${id}-ingredientAmount`}
                  >
                    Amount
                    <Field
                      name="newIngredientAmount"
                      id={`${id}-ingredientAmount`}
                      className={`${css.enterGeneralInfo} ${
                        errors.newIngredientAmount &&
                        touched.newIngredientAmount &&
                        css.errorField
                      }`}
                      placeholder="100g"
                    />
                    <ErrorMessage
                      className={css.errorMsg}
                      name="newIngredientAmount"
                      component="span"
                    />
                  </label>
                </div>
                <FieldArray name="ingredients">
                  {({ push, remove }) => {
                    return (
                      <div className={css.additionalForIngredients}>
                        <button
                          id="addIngredientBtn"
                          className={css.addIngredient}
                          type="button"
                          onClick={() => {
                            if (
                              values.newIngredientName !== '' &&
                              values.newIngredientAmount !== ''
                            ) {
                              const itemId = ingredients.find(
                                item => item.name === values.newIngredientName
                              )._id;
                              if (
                                !values.ingredients.find(
                                  item => item.id === itemId
                                )
                              ) {
                                push({
                                  id: itemId,
                                  measure: values.newIngredientAmount,
                                });
                                setFieldValue('newIngredientAmount', '');
                              }
                            }
                          }}
                        >
                          Add new Ingredient
                        </button>
                        {(screenWidth < 768
                          ? values.ingredients.length > 0
                          : true) && (
                          <table className={css.tableOfIngredients}>
                            <thead>
                              <tr>
                                <th
                                  className={`${css.tableHeader} ${css.nameColumn}`}
                                >
                                  Name:
                                </th>
                                <th
                                  className={`${css.tableHeader} ${css.amountColumn}`}
                                >
                                  Amount:
                                </th>
                                <th className="visually-hidden">D</th>
                              </tr>
                            </thead>
                            <tbody>
                              {values.ingredients.map((item, index) => {
                                return (
                                  <tr key={item.id}>
                                    <td
                                      className={`${css.listOfIngredients} ${css.nameColumn}`}
                                    >
                                      {
                                        ingredients.find(
                                          itemList => itemList._id === item.id
                                        ).name
                                      }
                                    </td>
                                    <td
                                      className={`${css.listOfIngredients} ${css.amountColumn}`}
                                    >
                                      {item.measure}
                                    </td>
                                    <td className={css.deleteIngredientIcon}>
                                      <button
                                        type="button"
                                        onClick={() => remove(index)}
                                      >
                                        <RiDeleteBin4Line size={16} />
                                      </button>
                                    </td>
                                  </tr>
                                );
                              })}
                            </tbody>
                          </table>
                        )}
                      </div>
                    );
                  }}
                </FieldArray>
                <h3 className={css.instructionsHeader}>Instructions</h3>
                <label
                  className={css.generalInfoLabel}
                  htmlFor={`${id}-instructions`}
                />
                <Field
                  name="instructions"
                  id={`${id}-instructions`}
                  className={`${css.instructionsField} ${
                    errors.instructions &&
                    touched.instructions &&
                    css.errorField
                  }`}
                  rows="6"
                  as="textarea"
                  placeholder="Enter a text"
                />
                <ErrorMessage
                  className={css.errorMsg}
                  name="instructions"
                  component="span"
                />
                <button className={css.submitBtn} type="submit">
                  Publish Recipe
                </button>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
