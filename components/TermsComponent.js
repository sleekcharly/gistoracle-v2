import { List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import { Block } from "@material-ui/icons";

function TermsComponent() {
  return (
    <div className="mt-10 p-2 min-h-[100vh]">
      <section className="max-w-[750px] mr-auto ml-auto  mb-5 pb-20">
        <header className="mb-7 text-center">
          <p
            className="text-xl md:text-2xl lg:text-4xl font-semibold text-gray-800"
            component="h1"
          >
            Terms of Service
          </p>
        </header>

        {/*  terms body */}
        <article className="mb-8">
          <p className="text-gray-700 mb-[20px]">Welcome to Gistoracle!</p>

          <p className="text-gray-700 mb-[20px]">
            Gistoracle provides tecnologies and services that build communities
            and enable people to engage with each other.
          </p>

          <p className="text-gray-700 mb-[20px]">
            These terms of service("Terms of Service") set forth the agreement
            ("Agreement") between you and GISTORACLE LTD.("Gistoracle" "we" or
            "us"). It governs your use of Gistoracle and other products,
            features, apps, technologies, software and services we offer.
          </p>

          <p className="text-gray-700 mb-[20px]">
            Please ensure to read it, because, by using Gistoracle, you consent
            to these terms.
          </p>
        </article>

        {/* terms section */}
        <section>
          {/* articles */}
          <article className="mb-8">
            <p className="text-[#933a16] text-lg md:text-xl lg:text-2xl mb-5">
              1. Who may use our services
            </p>

            <p className="text-gray-700">
              Use of Gistoracle by anyone under 13 years of age is prohibited.
              In the jurisdiction where you live, you represent that you are
              over the age required by the laws of your country in order to be
              allowed to use the services offered by Gistoracle. If you are not
              up to the legal age, your parent or legal guardian must consent to
              the terms of service and affirm that this agreement is accepted on
              behalf of the minor and they must bear responsibility for your
              use. If you are accepting these Terms of Service on behalf of
              someone else or an entity, you confirm that you have the legal
              authority to bind that person or entity to this Agreement.
            </p>
          </article>

          <article className="mb-8">
            <p className="text-[#933a16] text-lg md:text-xl lg:text-2xl mb-5">
              2. Privacy
            </p>

            <p className="text-gray-700">
              How we handle the information you provide to us while using our
              services is described in our{" "}
              <a href="/privacy" className="text-[#800000]">
                Privacy Policy
              </a>
              . You understand that through your use of services offered by us ,
              you consent to the collection and use (as set out in the Privacy
              Policy) of this information, processing and use by Gistoracle and
              its affiliates.
            </p>
          </article>

          <article className="mb-8">
            <p className="text-[#933a16] text-lg md:text-xl lg:text-2xl mb-5">
              3. Utilizing Our Services
            </p>

            <p className="text-gray-700 mb-4">
              Our Services always evolves. Therefore, at our own discretion, the
              services may change from time to time. We reserve the right to
              temporarily or permanently stop any feature or services to you or
              our entire users. We may also create limits on use at our sole
              discretion at any time. We also retain the right or refuse to
              distribute or remove any content on the services we render,
              restrict visibility or distribution of contents on the service,
              terminate or suspend users.
            </p>

            <p className="text-gray-700">
              When granted access and use Gistoracle services, you agree that
              Gistoracle and its third-party providers may place ads on the
              services rendered or in association with the display of content
              from the services either created by you or others.
            </p>
          </article>

          <article className="mb-8">
            <p className="text-[#933a16] text-lg md:text-xl lg:text-2xl mb-5">
              4. What you cannot do
            </p>

            <List
              aria-label="what you cannot do"
              style={{ background: "#f2f6f7" }}
            >
              <ListItem>
                <ListItemIcon>
                  <Block />
                </ListItemIcon>

                <p className="text-gray-700">
                  Use Gist oracle services in any form that would interfere
                  with, disable or impair the services.
                </p>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Block />
                </ListItemIcon>

                <p className="text-gray-700">
                  Probe, scan, or test the vulnerability of any system or
                  network or breach or circumvent any security or authenticaton
                  measures.
                </p>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Block />
                </ListItemIcon>

                <p className="text-gray-700">
                  Obtain access to (or try to gain access to) another user's
                  Gistoracle account or any portions of our services including
                  our devices or networks connected or used together with our
                  services primarily not acessible to the public.
                </p>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Block />
                </ListItemIcon>

                <p className="text-gray-700">
                  Interfere with, or disrupt, (or attempt to do so), the access
                  of any user, host or network, including, without limitation,
                  sending a virus, overloading, flooding, spamming, mail-bombing
                  the Services, or by scripting the creation of Content in such
                  a manner as to interfere with or create an undue burden on our
                  Services.
                </p>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <Block />
                </ListItemIcon>

                <p className="text-gray-700">
                  Use the Services we render to violate applicable law or
                  infringe any person’s or entity's intellectual property rights
                  or any other proprietary rights.
                </p>
              </ListItem>
            </List>
          </article>

          <article className="mb-8">
            <p className="text-[#933a16] text-lg md:text-xl lg:text-2xl mb-5">
              5. Indemnity
            </p>

            <p className="text-gray-700">
              Other than the extent prohibited by law, you agree to defend,
              indemnify, and hold us, our directors, officers, employees,
              affiliates, contractors, third-party service providers harmless
              from any claim or demand, including costs and lawyer's fees, made
              by any third party due to or arising out of your use of our
              services, your violation of these terms, violation of applicable
              laws or regulations or your content. We will always reserve the
              right to control the defrnce of any matter for which you are
              required to indemnify us, and you agree to cooperate with our
              defence on these claims.
            </p>
          </article>

          <article className="mb-8">
            <p className="text-[#933a16] text-lg md:text-xl lg:text-2xl mb-5">
              6. Disclaimers and Limitations of Liability
            </p>

            <p className="text-gray-700">
              "GISTORACLE ENTITIES" MEANS GISTORACLE, LTD., AND ANY
              SUBSIDIARIES, AFFILIATES, RELATED COMPANIES, SUPPLIERS, LICENSORS
              AND PATNERS, AND THE OFFICERS, DIRECTORS, EMPLOYEES, AGENTS AND
              REPRESENTATIVES OF EACh OF THEM. EACH PROVISION BELOW APPLIES TO
              THE MAXIMUM EXTENT PERMITTED UNDER APPLICABLE LAW.
            </p>

            <List
              aria-label="disclaimers and limitations of liability"
              className="bg-[#f2f6f7]"
            >
              <ListItem>
                <p className="text-gray-700">
                  OUR SERVICES ARE AVAILABLE "AS-IS". YOU UNDERSATND AND AGREE
                  THAT OUR SERVICES ARE PROVIDED TO YOU ON AN "AS IS" AND "AS
                  AVAILABLE" BASIS WITHOUT WARRANTIES OF ANY KIND, EITHER
                  EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED
                  WARRANTIES OF MERCHANTABILITY, TITLE, FITNESS FOR A PARTICULAR
                  PURPOSE, AND NON-INFRINGEMENT.
                </p>
              </ListItem>

              <ListItem>
                <p className="text-gray-700">
                  GISTORACLE MAKES NO PROMISES WITH RESPECT TO, AND EXPRESSLY
                  DISCLAIMS ALL LIABILITY FOR: (i) CONTENT POSTED BY ANY USER OR
                  THIRD PARTY; (ii) ANY THIRD-PARTY PRODUCT, OR THIRD-PARTY
                  SERVICE LISTED ON OR ACCESSIBLE TO YOU THROUGH THE GISTORACLE
                  PLATFORM, INCLUDING AN INTEGRATED SERVICE PROVIDER OR
                  PROFESSIONAL CONTRIBUTOR; (iii) THE QUALITY OR CONDUCT OF ANY
                  THIRD PARTY YOU ENCOUNTER IN CONNECTION WITH YOUR USE OF THE
                  GISTORACLE PLATFORM; OR (iv) UNAUTHORZED ACCESS, USE OR
                  ALTERATION OF YOUR CONTENT. GISTORACLE MAKES NO WARRANTY THAT:
                  (a) THE GISTORACLE PLATFORM WOULD MEET YOUR REQUIREMENTS; (b)
                  THE GISTORACLE PLATFORM WILL BE UNINTERRUPTED, TIMELY, SECURE,
                  OR ERROR-FREE; (c) THE RESULTS OR INFORMATION THAT YOU MAY
                  OBTAIN FROM THE USE OF THE GISTORACLE PLATFORM, A PROFESSIONAL
                  CONTRIBUTOR, OR ANY OTHER USER WILL BE ACCURATE OR RELIABLE.
                </p>
              </ListItem>

              <ListItem>
                <p className="text-gray-700">
                  YOU AGREE THAT TO THE MAXIMUM EXTENT THE LAW PERMITS,
                  GISTORACLE ENTITIES WILL NOT BE LIABLE TO YOU UNDER ANY THEORY
                  OR LIABILITY. WITHOUT LIMITING THE FOREGOING, YOU AGREE THAT,
                  TO THE MAXIMUM EXTENT THE LAW PERMITS, GISTORACLE ENTITIES
                  SPECIFICALLY WILL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL,
                  CONSEQUENTIAL, SPECIAL, OR EXEMPLARY DAMAGES, LOSS OF PROFITS,
                  BUSINESS INTERRUPTION, REPUTATIONAL HARM, OR LOSS OF DATA
                  (EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH
                  DAMAGES OR SUCH DAMAGES ARE FORESEEABLE) ARISING OUT OF OR IN
                  ANY WAY CONNECTED WIT YOUR USE OF, OR INABILITY TO USE, THE
                  GISTORACLE PLATFORM.
                </p>
              </ListItem>

              <ListItem>
                <p className="text-gray-700">
                  YOUR SOLE REMEDY FOR DISSATISFACTION WITH GISTORACLE IS TO
                  STOP USING THE GISTORACLE PLATFORM.
                </p>
              </ListItem>
            </List>
          </article>

          <article className="mb-8">
            <p className="text-[#933a16] text-lg md:text-xl lg:text-2xl mb-5">
              7. Termination
            </p>

            <p className="text-gray-700 mb-3">
              You reserve the right to terminate these terms at any time and for
              any reason by deactivating your account and stop use of all
              services we render.
            </p>

            <p className="text-gray-700">
              We may suspend or terminate your account or ability to access or
              use the services we render at any time and for any or no reason,
              including for violating these terms or our{" "}
              <a href="/contentPolicy" className="text-[#800000]">
                content policy
              </a>
              .
            </p>
          </article>
        </section>
      </section>
    </div>
  );
}

export default TermsComponent;
