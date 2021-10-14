function ContentPolicyComponent() {
  return (
    <div className="mt-10 p-3 min-h-[100vh]">
      <section className="max-w-[750px] mr-auto ml-auto  mb-5 pb-20">
        <header className="mb-7 text-center">
          <p
            className="text-xl md:text-2xl lg:text-4xl font-semibold text-gray-800"
            component="h1"
          >
            Content Policy
          </p>

          <p className="text-sm md:text-base lg:text-lg text-gray-700">
            Effective May 05, 2020. Last updated May 11, 2020.
          </p>
        </header>

        {/*  content policy body */}
        <article className="mb-8">
          <p className="text-gray-700 mb-[20px]">
            Gistoracle is home to a vast network of communities called shrines
            that engage users into conversations, stories, events and exciting
            articles created, run and populated by you. It is our belief that if
            people don't feel safe they can't engage each other. The following
            rules help everyone on Gistoracle have a safe exerience.
          </p>
        </article>

        <article className="mb-14">
          <div className="mb-8">
            <p className="text-lg md:text-xl text-[#933a16] font-semibold">
              Be Respectful
            </p>
          </div>

          <div className="ml-10">
            <div className="mb-5">
              <p className="text-[#933a16] font-semibold">
                Interact with Others in a constructive way
              </p>
              <p className="text-gray-700">
                As a user on the Gistorcle platform, you have to assume everyone
                is here to express themselves with diverse backgrounds, beliefs,
                and opinions. Its is normal to disagree on issues, but please
                keep your conversations civil, respectful and considerate to
                other users.
              </p>
            </div>

            <div className="mb-5">
              <p className="text-[#933a16] font-semibold">Avoid Hate Speech</p>
              <p className="text-gray-700">
                At Gistoracle, we do not tolerate content that attacks or
                belittle an individual, or group based on gender, nationality,
                ethnicity, political group, religion, or race. Try to be as
                neutral as possible while expressing your views.
              </p>
            </div>

            <div className="mb-5">
              <p className="text-[#933a16] font-semibold">
                Zero tolerance for Harassment and Bullying
              </p>
              <p className="text-gray-700">
                We do not tolerate, abusive behavior directed towards private
                individuals or entities. Your content should not be an avenue to
                make threats against others or be an advocate for violence.
              </p>
            </div>
          </div>
        </article>

        <article className="mb-14">
          <div className="mb-8">
            <p className="text-lg md:text-xl text-[#933a16] font-semibold">
              User Rights has to be respected.
            </p>
          </div>

          <div className="ml-10">
            <div className="mb-5">
              <p className="text-[#933a16] font-semibold">Deceptive Activity</p>
              <p className="text-gray-700">
                As a user on the Gistorcle platform, you have to assume everyone
                is here to express themselves with diverse backgrounds, beliefs,
                and opinions. Its is normal to disagree on issues, but please
                keep your conversations civil, respectful and considerate to
                other users.
              </p>
            </div>

            <div className="mb-5">
              <p className="text-[#933a16] font-semibold">Copyright</p>
              <p className="text-gray-700">
                Avoid creating content that infringes any intellectual property
                rights. Content created from another source should be properly
                attributed.
              </p>
            </div>
          </div>
        </article>

        <article className="mb-14">
          <div className="mb-8">
            <p className="text-lg md:text-xl text-[#933a16] font-semibold">
              Don't break the Gistoracle platform or do anything that interferes
              with its normal use.
            </p>
          </div>
        </article>
      </section>
    </div>
  );
}

export default ContentPolicyComponent;
