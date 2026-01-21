import { Spinner } from '../ui/Spinner';

import { ReactPortal } from './ReactPortal';

export function LaunchScreen({ isLoading }: { isLoading?: boolean }) {
  return (
    <ReactPortal containerId="launch-screen">
      {isLoading && (
        <div className="absolute top-0 grid h-full w-full place-items-center bg-teal-900">
          <div className="animate-wiggle flex flex-col items-center">
            <div className="mb-4 flex items-center gap-2">
              <h1 className="text-2xl font-semibold text-white">UFC Quixadá</h1>
            </div>

            <Spinner className="fill-teal-900" />
          </div>
        </div>
      )}
    </ReactPortal>
  );
}
