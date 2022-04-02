import CleanerCard from "./CleanerCard";

const CleanersList = ({
  cleaners,
  onOpen,
  selectedDate,
  properties,
  toasterFunction,
}) => {
  // const sampleData = [
  //   {
  //     id: 1,
  //     role: "cleaner",
  //     pay_rate: "2000.00",
  //     location: {
  //       id: 1,
  //       address: "1518 Clitherow Street",
  //       city: "toronto",
  //       province: "ON",
  //       longitude: "2.0000",
  //       latitude: "1.0000",
  //     },
  //     user: {
  //       id: 1,
  //       username: "adam",
  //       first_name: "adam",
  //       last_name: "schulte",
  //       email: "adamschulte148@hotmail.com",
  //     },
  //     imgurl:
  //       "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  //     average_rating: {
  //       rating__avg: 4.0,
  //     },
  //     rating_count: 2,
  //     top_comment: "hi there",
  //   },
  // ];

  const listOfCleaners = cleaners.map(cleaner => (
    <CleanerCard
      key={cleaner.id}
      {...cleaner}
      onOpen={onOpen}
      selectedDate={selectedDate}
      properties={[...properties]}
      toasterFunction={toasterFunction}
    />
  ));

  // const staticCleaner = sampleData.map(cleaner => (
  //   <CleanerCard key={cleaner.id} {...cleaner} onOpen={onOpen} />
  // ));

  return (
    <section>
      {listOfCleaners}
      {/* {staticCleaner} */}
    </section>
  );
};
export default CleanersList;
