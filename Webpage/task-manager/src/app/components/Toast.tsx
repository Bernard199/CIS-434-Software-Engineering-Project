// Design found at https://readymadeui.com/tailwind-components/toast
// Error Notifications.

//Datatype for the props
interface ToastProps {
  type: string;
}

// Define a Map for mapping responses to numbers
const outputmap = new Map<string, number>([
    ["success", 1],
    ["error", 2],
    ["warning", 3],
  ]);

// Helper function to render the appropriate toast
const renderToastContent = (type: number | undefined) => {
    switch (type) {
      case 1: // Success
        return (
          <div
            className="bg-white shadow-[0_3px_10px_-3px_rgba(6,81,237,0.3)] border-l-[6px] border-green-500 text-gray-800 flex items-center w-max max-w-sm p-4 rounded-md"
            role="alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] shrink-0 fill-green-500 inline mr-3"
              viewBox="0 0 512 512"
            >
              <ellipse cx="246" cy="246" data-original="#000" rx="246" ry="246" />
              <path
                className="fill-white"
                d="m235.472 392.08-121.04-94.296 34.416-44.168 74.328 57.904 122.672-177.016 46.032 31.888z"
                data-original="#000"
              />
            </svg>
            <span className="text-sm font-semibold tracking-wide">
              Update successfully
            </span>
          </div>
        );

      case 2: // Error
        return (
          <div
            className="bg-white shadow-[0_3px_10px_-3px_rgba(6,81,237,0.3)] border-l-[6px] border-yellow-500 text-gray-800 flex items-center w-max max-w-sm p-4 rounded-md"
            role="alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] shrink-0 fill-yellow-500 inline mr-3"
              viewBox="0 0 128 128"
            >
              <path d="M56.463 14.337 6.9 106.644C4.1 111.861 8.173 118 14.437 118h99.126c6.264 0 10.338-6.139 7.537-11.356L71.537 14.337c-3.106-5.783-11.968-5.783-15.074 0z" />
              <g className="fill-white">
                <path
                  d="M64 31.726a5.418 5.418 0 0 0-5.5 5.45l1.017 44.289A4.422 4.422 0 0 0 64 85.726a4.422 4.422 0 0 0 4.482-4.261L69.5 37.176a5.418 5.418 0 0 0-5.5-5.45z"
                  data-original="#fff"
                />
                <circle cx="64" cy="100.222" r="6" data-original="#fff" />
              </g>
            </svg>
            <span className="text-sm font-semibold tracking-wide">
              Account inactive
            </span>
          </div>
        );

      case 3: // Warning
        return (
          <div
            className="bg-white shadow-[0_3px_10px_-3px_rgba(6,81,237,0.3)] border-l-[6px] border-red-500 text-gray-800 flex items-center w-max max-w-sm p-4 rounded-md"
            role="alert"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-[18px] shrink-0 fill-red-500 inline mr-3"
              viewBox="0 0 32 32"
            >
              <path
                d="M16 1a15 15 0 1 0 15 15A15 15 0 0 0 16 1zm6.36 20L21 22.36l-5-4.95-4.95 4.95L9.64 21l4.95-5-4.95-4.95 1.41-1.41L16 14.59l5-4.95 1.41 1.41-5 4.95z"
                data-original="#ea2d3f"
              />
            </svg>
            <span className="text-sm font-semibold tracking-wide">
              Something went wrong
            </span>
          </div>
        );
      default:
        return null;
    }
  };

export default function Toast({ type }: ToastProps) {
  return(

    <div className="font-[sans-serif] space-y-6 mx-auto w-max mt-4">
        renderToastContent(outputmap.get(type))     
    </div>

  );
}

