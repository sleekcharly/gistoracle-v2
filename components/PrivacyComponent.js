import { List, ListItem, ListItemIcon } from "@material-ui/core";
import { ChevronRight } from "@material-ui/icons";

function PrivacyComponent() {
  return (
    <div className="mt-10 p-3 min-h-[100vh]">
      <section className="max-w-[750px] mr-auto ml-auto  mb-5 pb-20">
        <header className="mb-7 text-center">
          <p
            className="text-xl md:text-2xl lg:text-4xl font-semibold text-gray-800"
            component="h1"
          >
            Privacy Policy
          </p>

          <p className="text-sm md:text-base lg:text-lg text-gray-700">
            Effective May 05, 2020. Last revised May 10, 2020.
          </p>
        </header>

        {/*  privacy body */}
        <article className="mb-8">
          <p className="text-gray-700 mb-[20px]">
            Gistoracle recognizes that your privacy is very important, and this
            we take this seriously. Our privacy policy ("Privacy Policy")
            describes our policies and procedures about, extraction, use,
            disclosure and sharing of your personal data when you use
            Gistoracle. Gistoracle Ltd. is responsible for the control of
            personal information collected through Gistoracle. The Privacy
            Policy applies to activities by Gistoracle Ltd. and its affiliates
            and subsidiaries (collectively "Gistoracle", "we" or "us"). Personal
            information or personal data means information relating to an
            identified or identifiable natural person.
          </p>
        </article>

        <article className="mb-14">
          <div className="mb-8">
            <p className="text-lg md:text-xl text-[#933a16] font-semibold">
              Information you give us
            </p>
            <p className="text-gray-700">
              When you use the Gistoracle services, we collect information you
              provide to us directly.
            </p>
          </div>

          <div className="ml-10">
            <div className="mb-5">
              <p className="text-[#933a16] font-semibold">
                Account Information
              </p>
              <p className="text-gray-700">
                When you create a Gistoracle account, we may require you to give
                us an email, username and password. Your username is public, and
                doesn't have to be your real name. While using the platform you
                may choose to provide other account information, like a short
                biography, profile picture and display name.
              </p>
            </div>

            <div className="mb-5">
              <p className="text-[#933a16] font-semibold">
                The content you create
              </p>
              <p className="text-gray-700">
                We collect the content you create on the Gistoracle platform.
                Contents include the shrines you create, your posts and
                comments, your reports and other communications with us.
              </p>
            </div>

            <div className="mb-5">
              <p className="text-[#933a16] font-semibold">
                The actions you take
              </p>
              <p className="text-gray-700">
                We extract information about evry action you take while using
                the platform. Actions include interactions with created content,
                like liking a post, saving, following a shrine and reporting.
              </p>
            </div>

            <div className="mb-5">
              <p className="text-[#933a16] font-semibold">
                Other information we collect
              </p>
              <p className="text-gray-700">
                You may decide to give us other information. For instance, we
                may extract information when you participate in Gistoracle
                sponsored activities or promotions, fill out a form, apply for a
                job, or communicate with us.
              </p>
            </div>
          </div>
        </article>

        <article className="mb-14">
          <div className="mb-8">
            <p className="text-lg md:text-xl text-[#933a16] font-semibold">
              Information Collected Automatically
            </p>
            <p className="text-gray-700">
              When you gain access to use our services, we automatically may
              collect information about you. Thes informations could include:
            </p>
          </div>

          <div className="ml-10">
            <div className="mb-5">
              <p className="text-[#933a16] font-semibold">Usage data and log</p>
              <p className="text-gray-700">
                When you use Gistoracle we may log some information. These
                information may include IP address, browser type, device
                information, operating system, referral URLs, pages visited,
                search terms and links clicked. We only keep IP addresses used
                to signup to Gistoracle.
              </p>
            </div>

            <div className="mb-5">
              <p className="text-[#933a16] font-semibold">
                Information extracted from cookies
              </p>
              <p className="text-gray-700">
                Cookies are pieces of data stored by your browser which we may
                receive information from whenever a request is made. information
                extracted from cookies are used to improve your user experience,
                understand user activity as well as personalize content.
              </p>
            </div>

            <div className="mb-5">
              <p className="text-[#933a16] font-semibold">Location</p>
              <p className="text-gray-700">
                We may receive and process information about your location. For
                instance, we may derive your approximate location from other
                information about you including your IP address. This we use to
                personalize content based on where you are located.
              </p>
            </div>
          </div>
        </article>

        <article className="mb-14">
          <div className="mb-8">
            <p className="text-lg md:text-xl text-[#933a16] font-semibold">
              Information Collected by third Parties
            </p>
          </div>

          <div className="ml-10">
            <div className="mb-5">
              <p className="text-[#933a16] font-semibold">Embedded content</p>
              <p className="text-gray-700">
                Gistoracle displays some linked content -n-line via 'embeds'.
                For instance, Gistoracle posts that contain links to youtube or
                any other video service may load the linked videos directly
                within Gistoracle. Gistoracle does not control how data is
                collected by these third party when they derve you content
                directly via their embeds. Hence embeded content is not covered
                by our Privacy Policy by by the policies from which the content
                is embedded.
              </p>
            </div>

            <div className="mb-5">
              <p className="text-[#933a16] font-semibold">Ads</p>
              <p className="text-gray-700">
                We are in partnership with third-party ad exchanges to show
                advertisements relevant to your interests. Those third parties
                collect information, including usage data and information from
                cookies while providing such ads. No information from your
                Gistoracle account is passes to these tird parties.
              </p>
            </div>
          </div>
        </article>

        <article className="mb-14">
          <div className="mb-3">
            <p className="text-gray-700 mb-2">
              A major part of the information on the platform is public and
              accessible to everyone, with or without a Gistoracle account. By
              using Gistoracle services, you allowing us to share this
              information freely and publicly.
            </p>

            <p className="text-gray-700 mb-2">
              When you create content to a publick part of the platform , any
              visitor to and users of Gistoracle services will be able to view
              that content, the username associated with it, and the date it was
              originally created.
            </p>

            <p className="text-gray-700 mb-2">
              A profile page associated with your Gistoracle account is
              public.You profile contains information about various activies you
              perform on te Gistoracle service, such as your username, display
              name, bio, created posts, vibrations and the date you joined the
              Gistoracle platform.
            </p>

            <p className="text-gray-700 mb-2">
              Your use of these features enables the sharing of certain
              information with your friends or the public, depending on the
              settings you establish with the third party that provides the
              social sharing feature. For more information about the purpose and
              scope of data collection and processing in connection with social
              sharing features, please visit the privacy policies of the third
              parties that provide these social sharing features (Facebook, and
              Twitter).
            </p>

            <p className="text-gray-700 mb-2">
              We do not sell nonpublic information. We only share thes
              information in these ways:
            </p>
          </div>

          {/* non public info */}
          <div>
            <List className="bg-[#f2f6f7]">
              <ListItem>
                <ListItemIcon>
                  <ChevronRight color="secondary" />
                </ListItemIcon>

                <p className="text-gray-700">
                  Personalization. In order to tailor the content and
                  information that we display to you in Gistoracle, we may use
                  your nonpublic information.
                </p>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <ChevronRight color="secondary" />
                </ListItemIcon>

                <p className="text-gray-700">
                  Gistoracle Analytics. We use your data to gather metrics to
                  better understand how our users access and use the Gistoracle
                  service; to evaluate and improve Gistoracle and to develop new
                  products and services.
                </p>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <ChevronRight color="secondary" />
                </ListItemIcon>

                <p className="text-gray-700">
                  Comply with Law. To comply with legal obligations and as part
                  of our general business operations we may use your
                  information.
                </p>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <ChevronRight color="secondary" />
                </ListItemIcon>

                <p className="text-gray-700">
                  Prevent Misuse. We use your information where we believe
                  necessary to investigate, prevent or take actions regarding
                  illegal activities, situations involving potential threats to
                  safety of any person.
                </p>
              </ListItem>

              <ListItem>
                <ListItemIcon>
                  <ChevronRight color="secondary" />
                </ListItemIcon>

                <p className="text-gray-700">
                  In cases of emergency. We may share information if we believe
                  it's necessary to prevent harm.
                </p>
              </ListItem>
            </List>
          </div>
        </article>

        <article className="mb-10">
          <div>
            <p className="text-lg md:text-xl text-[#933a16] font-semibold mb-2">
              How your information is protected
            </p>

            <p className="text-gray-700">
              There are various measures we take to help protect your
              information from theft, loss, misuse, and unauthorized access. For
              instance, HTTPS is used while information is being transmitted.
            </p>
          </div>
        </article>

        <article className="mb-10">
          <div>
            <p className="text-lg md:text-xl text-[#933a16] font-semibold mb-2">
              Policy changes
            </p>

            <p className="text-gray-700">
              From time to time we may alter this Privacy Policy. Whenever we
              make any changes, we will let you know by revising the date of the
              policy. you are encouraged to review the Privacy plicy whenever
              you gain access to use our services to stay informed about
              practices on information and how you can help protect your
              privacy.
            </p>
          </div>
        </article>

        <article>
          <div>
            <p className="text-lg md:text-xl text-[#933a16] font-semibold mb-2">
              Contact Us
            </p>

            <p className="text-gray-700 mb-3">
              If there are any other questions you may have about this privacy
              policy, please contact gistoracle@gmail.com or at:
            </p>

            <p className="text-gray-700 font-semibold">Gistoracle Ltd.</p>
            <p className="text-gray-700 font-semibold">
              58 Awoniyi Elemo Street, Ajao Estate.
            </p>
            <p className="text-gray-700 font-semibold">Lagos, Nigeria</p>
          </div>
        </article>
      </section>
    </div>
  );
}

export default PrivacyComponent;
