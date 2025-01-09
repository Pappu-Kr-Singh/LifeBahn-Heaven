import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import axios from "axios";

const LifeLegacy = () => {
  const { currentUser } = useContext(AuthContext);
  const { _id } = useParams();
  const [fetching, setFetching] = useState(false);
  const [legacyData, setLegacyData] = useState([]);

  // console.log(currentUser);
  // console.log(currentUser?.data?.user?._id);

  // useEffect(() => {
  //   const fetchLegacy = async () => {
  //     setFetching(true);
  //     try {
  //       const response = await axios.get(
  //         `https://api.lifebahnheaven.com/api/v1/legacies/${_id}`,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${currentUser?.data.accessToken}`, // Use access token
  //           },
  //         }
  //       );

  //       const jsonData = response.data.data;
  //       // console.log(jsonData);
  //       // setPost(jsonData); // Store the fetched data in the state
  //     } catch (error) {
  //       console.error("Fetch error:", error);
  //     } finally {
  //       setFetching(false);
  //     }
  //   };

  //   fetchLegacy();
  // }, []);

  useEffect(() => {
    const fetchLegacy = async () => {
      setFetching(true);
      // console.log("Current User ID:", currentUser?.data?.user?._id);

      // Store the user ID from currentUser in _id
      const userId = currentUser?.data?.user?._id;
      if (!userId) {
        console.error("No User ID found.");
        setFetching(false);
        return;
      }

      try {
        const response = await axios.get(
          `https://api.lifebahnheaven.com/api/v1/legacies`,
          {
            headers: {
              Authorization: `Bearer ${currentUser?.data.accessToken}`,
            },
          }
        );

        const jsonData = response.data.data;
        // console.log(jsonData);
        setLegacyData(jsonData); // Store the fetched data in the state
        // console.log(legacyData);
      } catch (error) {
        console.error("Fetch error:", error.response?.data || error.message);
      } finally {
        setFetching(false);
      }
    };

    fetchLegacy();
  }, [currentUser]);

  return (
    <>
      <div className="container">
        <div className="hero">
          <h1>Life Legacy</h1>
          <div className="build_legacy">
            <Link to={"/profile/build-legacy"}>
              <button>Build Your Legacy</button>
            </Link>
            {/* <button>Update Your Legacy</button> */}
          </div>

          <div className="my_legacy">
            <h2>My Legacy</h2>
            <div className="legacy_section">
              <img src={currentUser?.data?.user?.avatar} alt="" />
              <div className="text_n_para">
                <p>
                  <strong>{currentUser?.data?.user?.fullName}</strong>
                </p>
                {/* <p>
                  <b>Born: </b> {legacyData?.birthPlace}
                </p>
                <p className="desc">{legacyData?.description}</p> */}
              </div>
            </div>
          </div>
        </div>

        {/* {currentUser?.data?.user?._id === legacyData.userId && ( */}
        {legacyData.map((legacy) =>
          currentUser?.data?.user?._id === legacy.userId ? (
            <div className="legacy_inner_sections">
              <div className="myaccomplishment" key={legacy.userId}>
                <h5>My Accomplishment</h5>
                <div className="myacc_inner">
                  <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                      <tr>
                        <th
                          style={{
                            border: "1px solid #454040",
                            padding: "8px",
                          }}
                        >
                          Year
                        </th>
                        <th
                          style={{
                            border: "1px solid #454040",
                            padding: "8px",
                          }}
                        >
                          Description
                        </th>
                        <th
                          style={{
                            border: "1px solid #454040",
                            padding: "8px",
                          }}
                        >
                          Beneficiaries
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {legacy.accomplishments.map((accomplishment, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              border: "1px solid #454040",
                              padding: "8px",
                            }}
                          >
                            {accomplishment.from}
                          </td>
                          <td
                            style={{
                              border: "1px solid #454040",
                              padding: "8px",
                            }}
                          >
                            {accomplishment.description}
                          </td>
                          <td
                            style={{
                              border: "1px solid #454040",
                              padding: "8px",
                            }}
                          >
                            {accomplishment.beneficiaries}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="myassets">
                <h5>My Assets</h5>
                <div className="myacc_inner">
                  <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                      <tr>
                        <th
                          style={{
                            border: "1px solid #454040",
                            padding: "8px",
                          }}
                        >
                          Item
                        </th>
                        <th
                          style={{
                            border: "1px solid #454040",
                            padding: "8px",
                          }}
                        >
                          Description
                        </th>
                        <th
                          style={{
                            border: "1px solid #454040",
                            padding: "8px",
                          }}
                        >
                          Beneficiaries
                        </th>
                        <th
                          style={{
                            border: "1px solid #454040",
                            padding: "8px",
                          }}
                        >
                          Value
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {legacy.assets.map((asset, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              border: "1px solid #454040",
                              padding: "8px",
                            }}
                          >
                            {asset.item}
                          </td>
                          <td
                            style={{
                              border: "1px solid #454040",
                              padding: "8px",
                            }}
                          >
                            {asset.description}
                          </td>
                          <td
                            style={{
                              border: "1px solid #454040",
                              padding: "8px",
                            }}
                          >
                            {asset.beneficiaries}
                          </td>
                          <td
                            style={{
                              border: "1px solid #454040",
                              padding: "8px",
                            }}
                          >
                            {asset.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="myrelationship">
                <h5>My Relationships</h5>
                <div className="myacc_inner">
                  <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                      <tr>
                        <th
                          style={{
                            border: "1px solid #454040",
                            padding: "8px",
                          }}
                        >
                          Name
                        </th>
                        <th
                          style={{
                            border: "1px solid #454040",
                            padding: "8px",
                          }}
                        >
                          Last Name
                        </th>
                        <th
                          style={{
                            border: "1px solid #454040",
                            padding: "8px",
                          }}
                        >
                          Relationship
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {legacy.relationships.map((relationship, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              border: "1px solid #454040",
                              padding: "8px",
                            }}
                          >
                            {relationship.name}
                          </td>
                          <td
                            style={{
                              border: "1px solid #454040",
                              padding: "8px",
                            }}
                          >
                            {relationship.lastName}
                          </td>
                          <td
                            style={{
                              border: "1px solid #454040",
                              padding: "8px",
                            }}
                          >
                            {relationship.relationship}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="mybucketlist">
                <h5>My Bucket List</h5>
                <div className="myacc_inner">
                  <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                      <tr>
                        <th
                          style={{
                            border: "1px solid #454040",
                            padding: "8px",
                          }}
                        >
                          Type
                        </th>
                        <th
                          style={{
                            border: "1px solid #454040",
                            padding: "8px",
                          }}
                        >
                          Place
                        </th>
                        <th
                          style={{
                            border: "1px solid #454040",
                            padding: "8px",
                          }}
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {legacy.bucketlists.map((bucketlist, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              border: "1px solid #454040",
                              padding: "8px",
                            }}
                          >
                            {bucketlist.type}
                          </td>
                          <td
                            style={{
                              border: "1px solid #454040",
                              padding: "8px",
                            }}
                          >
                            {bucketlist.description}
                          </td>
                          <td
                            style={{
                              border: "1px solid #454040",
                              padding: "8px",
                            }}
                          >
                            {bucketlist.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="myaspirations">
                <h5>My aspiration</h5>
                <div className="myacc_inner">
                  <table style={{ borderCollapse: "collapse", width: "100%" }}>
                    <thead>
                      <tr>
                        <th
                          style={{
                            border: "1px solid #454040",
                            padding: "8px",
                          }}
                        >
                          Name
                        </th>
                        <th
                          style={{
                            border: "1px solid #454040",
                            padding: "8px",
                          }}
                        >
                          Description
                        </th>
                        <th
                          style={{
                            border: "1px solid #454040",
                            padding: "8px",
                          }}
                        >
                          Comment
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {legacy.aspirations.map((aspiration, index) => (
                        <tr key={index}>
                          <td
                            style={{
                              border: "1px solid #454040",
                              padding: "8px",
                            }}
                          >
                            {aspiration.name}
                          </td>
                          <td
                            style={{
                              border: "1px solid #454040",
                              padding: "8px",
                            }}
                          >
                            {aspiration.description}
                          </td>
                          <td
                            style={{
                              border: "1px solid #454040",
                              padding: "8px",
                            }}
                          >
                            {aspiration.comment}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ) : null
        )}
      </div>
      {/* )} */}
    </>
  );
};

export default LifeLegacy;
