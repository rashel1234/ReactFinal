import { useEffect, useState } from "react";
import useLogedInUserType from "../Auth/LoginTypeHook";
import AdvancedSearch from "./AdvancedSearch";
import SearchBar from "./SearchBar";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@material-ui/core";
import Property from "../../pages/Property";

const ApartmentsComponent = () => {
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [showPopUp, setShowPopUp] = useState(false);
  const [apartmentsData, setApartmentsData] = useState([]);
  const [filteredApartments, setFilteredApartments] = useState([]);
  const userType = useLogedInUserType(localStorage.getItem("user"));

  // console.log(apartmentsData);

  useEffect(() => {
    fetch("http://localhost:9000/apartmentsData")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let result = data;
        if (userType == "Owner") {
          result = data.filter(
            (apartment) => apartment.owner == localStorage.getItem("user")
          );
        }

        setApartmentsData(result);
        setFilteredApartments(result);
      });
  }, []);

  const handleFilter = (input) => {
    setFilteredApartments(
      apartmentsData.filter((apartment) =>
        apartment.name.toLowerCase().includes(input.toLowerCase())
      )
    );
  };

  const hanleAdvancedFilter = (input) => {
    if (input.hasOwnProperty("value")) {
      if (input.type == "text") {
        setFilteredApartments(
          apartmentsData.filter(
            (apartment) =>
              apartment.country
                .toLowerCase()
                .includes(input.value.toLowerCase()) ||
              apartment.city.toLowerCase().includes(input.value.toLowerCase())
          )
        );
      }

      if (input.type == "number") {
        setFilteredApartments(
          apartmentsData.filter((apartment) => apartment.rooms >= input.value)
        );
      }

      if (input.type == "price") {
        setFilteredApartments(
          apartmentsData.filter((apartment) => apartment.price <= input.value)
        );
      }
    }
  };

  const handleMoreClick = (apartment) => {
    console.log(apartment);
    setSelectedApartment(apartment);
    setShowPopUp(true);
  };

  return (
    <div>
      <SearchBar
        onFilter={(input) => {
          handleFilter(input);
        }}
      ></SearchBar>
      <AdvancedSearch
        handleAdvancedFilter={(input) => {
          hanleAdvancedFilter(input);
        }}
      ></AdvancedSearch>
      <div className="row row-cols-1 row-cols-md-4">
        {filteredApartments.map((apartment) => (
          <div className="col mb-4" key={apartment._id}>
            <div className="card" style={{ width: "18rem" }}>
              <img src={apartment.imgURL.split('/n')[0]} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">{apartment.name}</h5>
                <span className="card-text">
                  <div>{apartment.country}</div>
                  <div>{apartment.city}</div>
                  <div>{apartment.price}$ per night</div>
                  <div>{apartment.rooms} Rooms</div>
                </span>
                <a
                  href="#"
                  className="btn btn-primary"
                  onClick={() => handleMoreClick(apartment)}
                >
                  More
                </a>

                {userType == "Owner" && (
                  <>
                    <a
                      href={`/addlisting?id=${apartment._id}`}
                      className="btn btn-primary"
                    >
                      Edit
                    </a>
                    <a href="#" className="btn btn-primary">
                      Delete
                    </a>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={showPopUp} onClose={() => setShowPopUp(false)}>
        <DialogTitle>Apartment Details</DialogTitle>
        <DialogContent>
          <Property apartment={selectedApartment}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowPopUp(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ApartmentsComponent;
