import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import Modal from "../Modal/Modal";
import RegistrationPage from "../RegistrationPage/RegistrationPage";
import logo from "../../images/logo.png";
import image1 from "../../images/imagen1.jpg";
import image2 from "../../images/mentalHealth.jpg";
import image3 from "../../images/legumbres.jpg";
import image4 from "../../images/pescado.jpg";
import image5 from "../../images/pavo.jpg";
import image6 from "../../images/tofu.jpg";
import image7 from "../../images/quinoa.jpg";
import image8 from "../../images/arrozIntegral.jpg";
import image9 from "../../images/panIntegral.jpg";
import image10 from "../../images/avena.jpg";
import image11 from "../../images/aguacate.jpg";
import image12 from "../../images/salmon.jpg";
import image13 from "../../images/aceite.jpg";
import image14 from "../../images/nueces.jpg";
import image15 from "../../images/pimientos.jpg";
import image16 from "../../images/tomates.jpg";
import image17 from "../../images/zanahoria.jpg";
import image18 from "../../images/brocoli.jpg";
import image19 from "../../images/manzanas.jpg";
import image20 from "../../images/platanos.jpg";
import image21 from "../../images/naranjas.jpg";
import image22 from "../../images/fruta.jpg";
import "./landingPage.css";

const LandingPage = ({
  isLoggedIn,
  setLoggedIn,
  setAdminUser,
  isAdminUser,
}) => {
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  return (
    <div className="landingPageContainer">
      <Navbar
        isLoggedIn={isLoggedIn}
        setLoggedIn={setLoggedIn}
        signUpModalOpen={signUpModalOpen}
        setSignUpModalOpen={setSignUpModalOpen}
        isAdminUser={isAdminUser}
        setAdminUser={setAdminUser}
      />
      <div className="landingPageLogo">
        <img src={logo} alt="logo" />
      </div>
      <p className="subtitle">
        <strong>
          We create healthy weekly menus exclusively for you based on your
          preferences and needs.
        </strong>
      </p>
      <ul>
        <li>
          <a href="#section1">1. How Should a Balanced Diet Be?</a>
        </li>
        <li>
          <a href="#section2">2. Why Follow a Balanced Diet?</a>
        </li>
        <li>
          <a href="#section3">3. Essential Ingredients</a>
        </li>
      </ul>

      <div className="section" id="section1">
        <h2>¿HOW SHOULD A BALANCED DIET BE?</h2>
        <p>
          A balanced diet is distinguished by possessing six essential
          attributes:
        </p>
        <div className="text">
          <div className="content">
            <ol>
              <li>
                <strong>Personalized</strong>
              </li>
              <p>
                The diet should completely adapt to the individual
                characteristics of each person, considering factors such as
                schedules, economic conditions, emotional state, among others.
              </p>
              <li>
                <strong>Complete</strong>
              </li>
              <p>
                It should provide all the necessary nutrients and fiber in
                appropriate amounts for the proper functioning of our body.
              </p>
              <li>
                <strong>Satisfactory</strong>
              </li>
              <p>
                It's crucial to remember that enjoying food is a pleasure.
                Therefore, it's important that the foods, portions, and
                preparations are suitable and enjoyable to meet our needs.
              </p>
              <li>
                <strong>Varied</strong>
              </li>
              <p>
                To avoid monotony, it is recommended to diversify the range of
                foods, prioritizing fresh and seasonal options.
              </p>
              <li>
                <strong>Adequate in energy</strong>
              </li>
              <p>
                It is fundamental that the diet supplies the necessary energy to
                maintain the proper functioning of the organism and prevent
                excess weight, as well as ailments and associated pathologies.
                In the case of seeking weight loss, the most favorable option is
                to follow a balanced diet that controls both calorie intake and
                nutrient intake, avoiding nutritional deficits and safeguarding
                health.
              </p>
              <li>
                <strong>Safe</strong>
              </li>
              <p>
                The diet should not compromise health; it should prevent food
                poisoning and avoid the ingestion of harmful components.
              </p>
            </ol>
          </div>

          <img src={image1} alt="image1" />
        </div>
      </div>
      <div className="section" id="section2">
        <h2>¿WHY MAINTAIN A BALANCED DIET?</h2>
        <p>
          A good diet improves and maintains our health. Maintaining a healthy
          and balanced diet is essential for maintaining good health and overall
          well-being. Here are several reasons why it's important to adopt
          healthy eating habits:
        </p>
        <div className="text">
          <div className="content">
            <ol>
              <li>
                <strong>Provides essential nutrients</strong>
              </li>
              <p>
                A balanced diet provides all the essential nutrients that the
                body needs to function properly, including vitamins, minerals,
                proteins, carbohydrates, and healthy fats.
              </p>
              <li>
                <strong>Weight control</strong>
              </li>
              <p>
                A balanced diet contributes to controlling body weight.
                Maintaining a healthy weight reduces the risk of developing
                health problems such as heart disease, type 2 diabetes, and
                metabolic disorders.
              </p>
              <li>
                <strong>Disease prevention</strong>
              </li>
              <p>
                Adopting a healthy diet can help prevent various chronic
                diseases, such as cardiovascular diseases, high blood pressure,
                certain types of cancer, and osteoporosis.
              </p>
              <li>
                <strong>Energy and performance</strong>
              </li>
              <p>
                A balanced diet provides the energy needed to perform daily
                activities and maintain good physical and mental performance.
              </p>
              <li>
                <strong>Improves digestive health</strong>
              </li>
              <p>
                The fiber present in a balanced diet promotes digestive health,
                preventing problems such as constipation and improving nutrient
                absorption.
              </p>
              <li>
                <strong>Strengthens the immune system</strong>
              </li>
              <p>
                A healthy diet strengthens the immune system, helping the body
                defend against infections and diseases.
              </p>
              <li>
                <strong>Promotes mental health</strong>
              </li>
              <p>
                There is a connection between diet and mental health. A balanced
                diet can improve mood, reduce the risk of depression, and
                provide the necessary nutrients for proper brain function.
              </p>
              <li>
                <strong>Promotes healthy lifestyle habits</strong>
              </li>
              <p>
                Adopting a balanced diet often goes hand in hand with other
                healthy lifestyle habits, such as regular physical activity and
                adequate hydration.
              </p>
              <li>
                <strong>Longevity</strong>
              </li>
              <p>
                Maintaining a balanced diet over time can contribute to a longer
                and healthier life.
              </p>
              <li>
                <strong>Quality of life</strong>
              </li>
              <p>
                Proper nutrition not only affects physical health but also
                overall quality of life, improving energy, concentration, and
                the ability to enjoy daily life.
              </p>
            </ol>
          </div>
          <img src={image2} alt="image2" />
        </div>
      </div>
      <div className="section" id="section3">
        <h2>ESSENTIAL INGREDIENTS</h2>
        <div className="text">
          <div className="content">
            <p><strong>LEAN PROTEIN</strong></p>
            <ol>
              <li>
                <strong>Building and repairing tissues.</strong>
              </li>
              
              <li>
                <strong>Formation of enzymes and hormones.</strong>
              </li>
              
              <li>
                <strong>Contribution to immune function and nutrient transport.</strong>
              </li>
            </ol>
          </div>
          <div className="imageContainer">
            <img src={image3} alt="image3" />
            <img src={image4} alt="image4" />
            <img src={image5} alt="image5" />
            <img src={image6} alt="image6" />
          </div>
          
        </div>
        <div className="text">
          <div className="content">
            <p><strong>WHOLE GRAINS:</strong></p>
            <ol>
              <li>
                <strong>Main source of energy due to complex carbohydrates.</strong>
              </li>
              
              <li>
                <strong>Rich in fiber for digestive health.</strong>
              </li>
              
              <li>
                <strong>Provides B-complex vitamins and minerals such as iron and magnesium.</strong>
              </li>
            </ol>
          </div>
          <div className="imageContainer">
            <img src={image7} alt="image7" />
            <img src={image8} alt="image8" />
            <img src={image9} alt="image9" />
            <img src={image10} alt="image10" />
          </div>
          
        </div>
        <div className="text">
          <div className="content">
            <p><strong>HEALTHY FATS:</strong></p>
            <ol>
              <li>
                <strong>Essential components of cell membranes.</strong>
              </li>
              
              <li>
                <strong>Aid in the absorption of fat-soluble vitamins (A, D, E, K).</strong>
              </li>
              
              <li>
                <strong>Contribute to the functioning of the nervous system.</strong>
              </li>
            </ol>
          </div>
          <div className="imageContainer">
            <img src={image11} alt="image11" />
            <img src={image12} alt="image12" />
            <img src={image13} alt="image13" />
            <img src={image14} alt="image14" />
          </div>
          
        </div>
        <div className="text">
          <div className="content">
            <p><strong>VEGETABLES:</strong></p>
            <ol>
              <li>
                <strong>Abundant in essential vitamins and minerals.</strong>
              </li>
              
              <li>
                <strong>High in fiber to promote digestive health.</strong>
              </li>
              
              <li>
                <strong>Rich in antioxidants that help combat oxidative stress.</strong>
              </li>
            </ol>
          </div>
          <div className="imageContainer">
            <img src={image15} alt="image15" />
            <img src={image16} alt="image16" />
            <img src={image17} alt="image17" />
            <img src={image18} alt="image18" />
          </div>
          
        </div>
        <div className="text">
          <div className="content">
            <p><strong>FRESH FRUITS:</strong></p>
            <ol>
              <li>
                <strong>Provide vitamins, especially vitamin C.</strong>
              </li>
              
              <li>
                <strong>Source of fiber for digestive health.</strong>
              </li>
              
              <li>
                <strong>Contain antioxidants and phytonutrients beneficial for health.</strong>
              </li>
            </ol>
          </div>
          <div className="imageContainer">
            <img src={image19} alt="image19" />
            <img src={image20} alt="image20" />
            <img src={image21} alt="image21" />
            <img src={image22} alt="image22" />
          </div>
          
        </div>
        </div>

      <RegistrationPage
        isOpen={signUpModalOpen}
        onClose={() => setSignUpModalOpen(false)}
      />
    </div>
  );
};

export default LandingPage;
