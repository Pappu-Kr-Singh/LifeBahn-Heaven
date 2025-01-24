import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";

function Home() {
  const { currentUser, setCurrentUser } = useContext(AuthContext);
  return (
    <>
      <div className="hero_section">
        {!currentUser ? (
          <div className="container">
            <div className="row">
              <div className="col-md-6 d-flex  flex-column justify-content-center hero-left">
                <h2>Welcome to</h2>
                <h1>LifeBahn Heaven</h1>
                <p>
                  <span>LifeBahn</span>
                  <strong>A community for finding a better life. 🌟</strong>
                </p>
                <div className="d-flex">
                  <Link to="/login">
                    <button>Become a Member</button>
                  </Link>
                  <Link to="/login">
                    <button>Get Inspired</button>
                  </Link>
                </div>
              </div>
              <div className="col-md-6 py-12 hero-right">
                <iframe
                  width="340"
                  height="420"
                  src="https://www.youtube.com/embed/PbSg2RoqW_M"
                  title="Lifebahn Heaven"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerpolicy="strict-origin-when-cross-origin"
                  allowfullscreen
                  style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                  }}
                ></iframe>
              </div>
            </div>
          </div>
        ) : (
          <div className="container">
            <div className="row">
              <div className="col-md-6 d-flex flex-column justify-content-center hero-left">
                <h2>Welcome to</h2>
                <h1>LifeBahn Heaven</h1>
                <p>
                  <strong>Become a Sponsor to Add your Rips 🌟</strong>
                </p>

                <Link to="/memoriams">
                  <button className="btn btn-primary font-bold">
                    Get Inspired
                  </button>
                </Link>
              </div>
              <div className="col-md-6 py-12 hero-right">
                <iframe
                  width="340"
                  height="420"
                  src="https://www.youtube.com/embed/PbSg2RoqW_M"
                  // title="Lifebahn Heaven"
                  frameborder="0"
                  allow="accelerometer; "
                  // referrerpolicy="strict-origin-when-cross-origin"
                  // allowfullscreen
                  style={{
                    borderRadius: "15px",
                    overflow: "hidden",
                  }}
                ></iframe>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="features">
        <div className="container">
          <h1>Features</h1>
          <div className="what_inner">
            <div className="item">
              <div>
                <img src="/creatememoriams.png" alt="" />
                <h6>Create Memoriams</h6>
              </div>
              <p>
                Honor your loved ones by creating personalized memoriams that
                celebrate their lives and legacies.
              </p>
            </div>
            <div className="item">
              <div>
                <img src="/sharememories.png" alt="" />
                <h6>Share Memories</h6>
              </div>
              <p>
                Upload photos, videos, and memorabilia to preserve cherished
                memories for generations.
              </p>
            </div>
            <div className="item">
              <div>
                <img src="/payrespect.png" alt="" />
                <h6>Pay Respects</h6>
              </div>
              <p>
                Leave flowers, prayers, or heartfelt messages to honor those who
                have passed.
              </p>
            </div>
            <div className="item">
              <div>
                <img src="/buildfamilytrees.png" alt="" />
                <h6>Build Family Trees</h6>
              </div>
              <p>
                Create detailed family trees to preserve your heritage and
                connect with your roots.
              </p>
            </div>
            <div className="item">
              <div>
                <img src="/mylegacy.png" alt="" />
                <h6>My Legacy</h6>
              </div>
              <p>
                Craft your own legacy by documenting your journey and
                contributions for future generations.
              </p>
            </div>
            <div className="item">
              <div>
                <img src="/globalcommunity.png" alt="" />
                <h6>Global Community</h6>
              </div>
              <p>
                Join a compassionate community sharing stories of resilience,
                love, and inspiration.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="how_it_works">
        <div className="container">
          <h1>How It Works</h1>
          <div className="what_inner">
            <div className="item">
              <div>
                <img src="/joincommunity.png" alt="" />
                <h4>
                  Join the <br />
                  Community
                </h4>
              </div>
              <p>
                Sign up to become a member and unlock access to the full
                features of LifeBahn Heaven.
              </p>
            </div>
            <div className="item">
              <div>
                <img src="/findmemoriams.png" alt="" />
                <h4>Create or Find Memoriams</h4>
              </div>
              <p>
                Honor your loved ones by creating a memoriam or search for
                existing ones to pay your respects.
              </p>
            </div>
            <div className="item">
              <div>
                <img src="/contributeandconnect.png" alt="" />
                <h4>Contribute and Connect</h4>
              </div>
              <p>
                Share stories, build family trees, and connect with others in a
                meaningful way.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="honoring_legends">
        <div className="container">
          <h1>Honoring Legends</h1>
          <div className="what_inner">
            <div className="item">
              <img src="/mahatma_gandhi.png" alt="" />
              <h3>Mahatma Gandhi</h3>
              <span>(1869-1948)</span>
              <p>Leader of India's independence movement.</p>
              <button>View Memoriam</button>
            </div>
            <div className="item">
              <img src="/mother_teresa.png" alt="" />
              <h3>Mother Teresa</h3>
              <span>(1910-1997)</span>
              <p>Known for her humanitarian work and care for the poor.</p>
              <button>View Memoriam</button>
            </div>
            <div className="item">
              <img src="nelson_mandela.png" alt="" />
              <h3>Nelson Mandela</h3>
              <span>(1918-2013)</span>
              <p>
                Anti-apartheid revolutionary and former President of South
                Africa.
              </p>
              <button>View Memoriam</button>
            </div>
          </div>
        </div>
      </div>

      <div className="community_says">
        <h2>What Our Community Says</h2>
        <div className="cs_items">
          <div className="cs_item">
            <p>
              LifeBahn has given me a space to honor my loved ones and connect
              with others who share similar values.
            </p>
            <h6>- Sarah M., Sponsor</h6>
          </div>
          <div className="cs_item">
            <p>
              Building my father's memoriam brought my family closer together
              and helped us heal.
            </p>
            <h6>- Alex J., Contributor</h6>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
