import dayjs from "dayjs";

function Footer() {
  return (
    <div className="bg-white">
      <div className="flex flex-wrap p-2 rounded-sm">
        <div className="w-[45%]">
          <a className="text-gray-700 text-xs w-full" href="/about">
            About
          </a>
        </div>

        <div className="w-[45%]">
          <a className="text-gray-700 text-xs w-full" href="/contentpolicy">
            Content Policy
          </a>
        </div>

        <div className="w-[45%]">
          <a className="text-gray-700 text-xs w-full" href="/privacy">
            Privacy Policy
          </a>
        </div>

        <div className="w-[45%]">
          <a className="text-gray-700 text-xs w-full" href="/terms">
            Terms
          </a>
        </div>
      </div>
      <div className="p-2">
        <p className="text-gray-700 text-xs w-full">
          Gist Oracle Ltd. © {dayjs().format("YYYY")}. All rights reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
