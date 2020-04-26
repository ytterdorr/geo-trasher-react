import React, { useState } from "react";

const InstructionsView = (props) => {
  const [language, setLanguage] = useState("English");

  const setEnglish = () => {
    setLanguage("English");
  };

  const setSwedish = () => {
    setLanguage("Swedish");
  };

  const returnToFirstView = () => {
    props.updateView("FirstView");
  };
  return (
    <div>
      {language === "Swedish" ? (
        <React.Fragment>
          <a href="#" onClick={setEnglish}>
            Change to English
          </a>
          <h3>Instruktioner</h3>

          <p style={styles.instructionText}>
            1. Gå in på https://geo-trasher-react.herokuapp.com
            <br />
            <br />
            2. Om du vill kan du göra ett konto som sparar din statistik genom
            att fylla i användarnamn och lösenord, annars kan du starta en
            anonym session.
            <br />
            <br />
            3. När du startar sessionen kommer den be om din position.
            GeoTrasher läser av din position varje gång du loggar ett skräp, men
            sparar ingen data utom position, tid och skräptyp. Om du gjort ett
            konto på sidan kopplas statistiken till ditt konto-id.
            <br />
            <br />
            4. GeoTrasher registrerar tre sorters skräp: Nikotin, Plast och
            Annat. Om du använder en Bluetooth-knapp loggas de med med ett klick
            (Nikotine), dubbelklick (Plastic) och trippelklick (Other). Du kan
            också använda digitala knappar, som du kan få fram på skärmen genom
            att trycka “Toggle Onscreen Buttons”
            <br />
            <br />
            När du avslutar sessionen får du se en sammanställning av din
            statistik och en kartbild över området där du plockat.
            <br />
            <br />
            <b>Tips!</b>
            <br />
            - Webbappen fungerar bara när skärmen på telefonen är igång, om din
            skärm slocknar snabbt kan du gå in på telefonens
            inställningar->Display och förlänga skärmtiden (skärmtimeout).
            <br />
            - Du kan ändra namnet på sessionen från siffror till något roligare
            genom att klicka på “change title”
            <br />- Om du vill använda din data till ett annat projekt kan du
            ladda ner den som en csv-fil som kan öppnas i t.ex. Excel.
          </p>
          <button onClick={returnToFirstView}>Tillbaka</button>
        </React.Fragment>
      ) : language === "English" ? (
        <React.Fragment>
          <a href="#" onClick={setSwedish}>
            Byt till Svenska
          </a>
          <h3>Instructions</h3>
          <p style={styles.instructionText}>
            1. Go to https://geo-trasher-react.herokuapp.com
            <br />
            <br />
            2. If you want you can create an account that saves your statistics
            by filling in your username and password, otherwise you can start an
            anonymous session.
            <br />
            <br />
            3. When you start the session, it will ask for your position.
            GeoTrasher reads your location every time you log a trash, but saves
            no data except location, time and trash type. If you created an
            account on the page, then the statistics are also linked to your
            account ID.
            <br />
            <br />
            4. GeoTrasher records three types of trash: Nicotine, Plastic and
            Other. If you use a Bluetooth button you can register them with one
            click (Nikotine), double-click (Plastic) and triple-click (Other).
            You can also use digital buttons, which you can access on the screen
            by pressing “Toggle Onscreen Buttons”.
            <br />
            <br />
            5.When you end the session you will see a summary of your statistics
            and a map image of the area where you picked.
            <br />
            <br />
            <b>Tips:</b>
            <br />
            - The web app only works when the screen of the phone is running, if
            your screen goes off quickly you can enter the phone's settings->
            Display and extend the screen time (screen timeout).
            <br />
            - You can change the name of the session from numbers to something
            more fun by clicking on "change title".
            <br />- If you want to use your data for another project you can
            download it as a csv file that can be opened in programs like Excel.
          </p>
          <button onClick={returnToFirstView}>Back</button>
        </React.Fragment>
      ) : null}
    </div>
  );
};

const styles = {
  instructionText: { textAlign: "left", maxWidth: "90vw", margin: "auto" },
};

export default InstructionsView;
