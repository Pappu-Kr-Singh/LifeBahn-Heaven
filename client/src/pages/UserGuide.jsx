import React from "react";

const UserGuide = () => {
  return (
    <>
      <div className="main">
        <div className="section__one">
          <h1>LifeBahn Heaven User Guide</h1>
          <div className="items">
            <div className="visitor item">
              <h4>VISITOR</h4>
              <div className="line"></div>
              <p>
                All members assigned to LifeBahn Heaven automatically have the
                Visitor role. Visitors can browse RIPs, view tributes, and
                participate in actions such as leaving flowers, saying a prayer,
                or making a donation on behalf of the RIP.
              </p>
            </div>
            <div className="sponsor item">
              <h4>SPONSOR</h4>
              <div className="line"></div>
              <p>
                Only LifeBahn Community Members can become Sponsors of RIPs. To
                become a Sponsor, simply add a RIP and follow the prompts to
                assign the role. Sponsors are the only users who can create and
                manage RIPs, assign contributors, and manage the memorial pages.
              </p>
            </div>
            <div className="contributer item">
              <h4>CONTRIBUTER</h4>
              <div className="line"></div>
              <p>
                Contributors can only be assigned by a Sponsor. As a
                Contributor, you can add pictures, videos, documents, and other
                memorabilia about the RIP. This can be done in the middle third
                of the RIP page.
              </p>
            </div>
          </div>
        </div>

        <div className="section__two">
          <div className="heading__n__para">
            <h5>Introduction</h5>
            <p>
              What matters beyond life is how we are remembered. What did we do
              during our life to promote and preserve humanity, ensuring the
              continuity of the human species? This is our legacy. Most of us
              live life without much purpose, simply struggling from day to day.
              Too busy to worry about our legacy, we often let the life we lead
              determine, by accident, our legacy. What makes much more sense is
              to consciously determine our legacy and then live our life to
              ensure that legacy. For those who have already departed (RIP),
              they can no longer choose how they will be remembered. However,
              we, their loved ones, can preserve their memories so future
              generations will remember their accomplishments and contributions
              to humanity.
            </p>
          </div>

          <div className="heading__n__para">
            <h5>LifeBahn Heaven User's Page</h5>
            <p>
              Upon successful login, you will be directed to the LifeBahn Heaven
              User's Page. From here, you can: <br />• Go to the Memoriams Page
              by selecting the Memoriams Tab. <br />• Search for your loved ones
              (RIPs) by clicking the Search Your RIP (blue) button, which will
              take you to the Find RIP page. <br />• Go to the My Legacy section
              to manage your own legacy.
            </p>
          </div>

          <div className="heading__n__para">
            <h5>Memoriams</h5>
            <p>
              In this section, users will see a list of RIPs along with action
              items, depending on their role. There are three possible roles:{" "}
              <br />• Visitors: Visitors can only browse, explore, and perform
              actions to pay respect or homage to RIPs. <br />• Contributors:
              This role, assigned only by a Sponsor, allows users to contribute
              pictures, videos, documents, and other memorabilia about the RIP.{" "}
              <br />• Sponsors: This role, assigned by the Administrator, allows
              users to create and manage RIP pages and assign contributors to
              those RIPs. Sponsors can access the "Become a Sponsor" button at
              the top of the page to start creating and managing RIPs.
            </p>
          </div>

          <div className="heading__n__para">
            <h5>Find RIP</h5>
            <p>
              Users should be able to search for RIPs using the search feature
              provided. If the search is successful, the user will be able to
              manage the RIP as described in the Managing Memoriams section of
              this guide. If the search is unsuccessful, you can Create
              Memoriams for your loved ones by becoming a Sponsor and following
              the Sponsor's Guide.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserGuide;
