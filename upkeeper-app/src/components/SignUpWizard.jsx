import React, { useEffect, useState } from "react";
//import { Fragment } from "react";
import ChooseRole from "./wizard/ChooseRole";
import CreateUserAccount from "./wizard/CreateUserAccount";
import CleanerComplete from "./wizard/CleanerComplete";
import CleanerListing from "./wizard/CleanerListing";
import HomeOwnerComplete from "./wizard/HomeOwnerComplete";
import CreatePropertyListing from "./wizard/CreatePropertyListing";
import OwnerListing from "./wizard/OwnerListing";
import EnterLocation from "./wizard/EnterLocation";
// import UploadProfilePhoto from "./wizard/UploadProfilePhoto";
// import CleanersList from "./CleanersList";
// import Review from "./Review";

const SignUpWizard = (props) => {
  const [pageNumber, setPageNumber] = useState(-1);
  const [userSelected, setUserSelected] = useState("");

  useEffect(() => {
    setUserData({ ...userData, role: userSelected });
  }, [userSelected]);

  const [userData, setUserData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
    username: ""
  });

  const [propertyData, setPropertyData] = useState({
    title: "",
    description: "",
    address: "",
    photo: ""
  });

  const [locationData, setLocationData] = useState({
    address: "",
    city: "",
    province: "",
    longitude: 0,
    latitude: 0
  });


  const [memberData, setMemberData] = useState({
    user: "",
    location: "",
    pay_rate: "",
    role: "",
    imgurl: "",
  });


  const decrement = () => {
    setPageNumber((pageNumber) => --pageNumber);
  };
  const increment = () => {
    setPageNumber((pageNumber) => ++pageNumber);
  };

  const cleanersBucket = [
    <CreateUserAccount
      increment={increment}
      decrement={decrement}
      setUserData={setUserData}
      userData={userData}
      setMemberData={setMemberData}
      memberData={memberData}
    />,
    <EnterLocation increment={increment} 
      decrement={decrement} 
      locationData={locationData} 
      setLocationData={setLocationData}
      setMemberData={setMemberData}
      memberData={memberData}/>,

    <CleanerListing
      increment={increment}
      decrement={decrement}
      memberData={memberData}
      userData={userData}
      locationData={locationData}
      setMemberData={setMemberData}

    />,
    // <UploadProfilePhoto
    //   increment={increment}
    //   decrement={decrement}
    //   setUserData={setUserData}
    //   userData={userData}
    // />,
    <CleanerComplete increment={increment} onClose={props.onClose} />,
  ];

  const homeOwnersBucket = [
    <CreateUserAccount
      increment={increment}
      decrement={decrement}
      setUserData={setUserData}
      userData={userData}
      setMemberData={setMemberData}
      memberData={memberData}
    />,
    // Dont think we want to create properties during signup? -adam
    <EnterLocation increment={increment} 
    decrement={decrement} 
    locationData={locationData} 
    setLocationData={setLocationData}
    setMemberData={setMemberData}
    memberData={memberData}
    />,
    <OwnerListing
    increment={increment}
    decrement={decrement}
    memberData={memberData}
    userData={userData}
    locationData={locationData}
    setMemberData={setMemberData}
    />,
    // <CreatePropertyListing
    //   increment={increment}
    //   decrement={decrement}
    //   propertyData={propertyData}
    //   setPropertyData={setPropertyData}
    // />,
    <HomeOwnerComplete increment={increment} onClose={props.onClose}/>,
  ];

  const wizards = {
    cleaner: cleanersBucket,
    owner: homeOwnersBucket,
  };

  return (
    <section className="modal">
      <header className="modal-header">
        <div onClick={props.onClose}>
          <i className="fa-solid fa-xmark modal-exit"></i>
        </div>

        {pageNumber < 0 ? (
          <ChooseRole
            pageNumber={pageNumber}
            roleSelected={setUserSelected}
            userSelected={userSelected}
            increment={increment}
            setUserData={setUserData}
            userData={userData}
            setMemberData={setMemberData}
            memberData={memberData}

          />
        ) : (
          userSelected &&
          userSelected.length !== 0 &&
          wizards[userSelected][pageNumber]
        )}
      </header>
      <main className="modal-content"></main>
    </section>
  );
};

export default SignUpWizard;
