import React from 'react'
import {
  faBiking,
  faRunning,
  faRoad,
  faClock,
  faTachometerAlt,
  faMountain,
} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

const StravaStats = ({
  stravaStats,
  stravaMostRecentRun,
  stravaMostRecentRide,
}) => {
  const [showRunning, setShowRunning] = React.useState(false)
  return (
    <div className="flex flex-col w-full lg:mx-auto relative lg:w-1/2">
      <div className="flex rounded-full self-center mb-4">
        <div
          role="button"
          className={`px-6 lg:px-12 py-2 lg:py-4 border-2 rounded-tl-full rounded-bl-full flex justify-center cursor-pointer  w-1/2 text-center ${
            !showRunning
              ? 'bg-darkPurple dark:bg-orange text-white border-darkPurple dark:border-orange'
              : ''
          }`}
          onClick={() => setShowRunning(false)}
        >
          <FontAwesomeIcon size="2x" icon={faBiking} />
        </div>
        <div
          role="button"
          className={`px-6 lg:px-12 py-2 lg:py-4 border-2 cursor-pointer w-1/2 rounded-tr-full rounded-br-full  flex justify-center flex justify-center ${
            showRunning
              ? 'bg-darkPurple dark:bg-orange text-white border-darkPurple dark:border-orange'
              : ''
          }`}
          onClick={() => setShowRunning(true)}
        >
          <FontAwesomeIcon size="2x" icon={faRunning} />
        </div>
      </div>
      <div className="border-2 mx-6 flex">
        <div className="px-8 py-4 flex flex-col md:w-1/2">
          <h3 className="font-bold text-xl mb-4">All time</h3>
          <p className="mb-3">
            <FontAwesomeIcon icon={faRoad} className="mr-2" />
            {Math.floor(
              (showRunning
                ? stravaStats.all_run_totals.distance
                : stravaStats.all_ride_totals.distance) / 1000,
            )}
            km
          </p>
          <p className="mb-3">
            <FontAwesomeIcon icon={faMountain} className="mr-2" />
            {showRunning
              ? stravaStats.all_run_totals.elevation_gain
              : stravaStats.all_ride_totals.elevation_gain}
            m
          </p>
          <p className="mb-3">
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            {Math.floor(
              (showRunning
                ? stravaStats.all_run_totals.moving_time
                : stravaStats.all_ride_totals.moving_time) / 3600,
            )}
            h
          </p>
          <p className="mb-3">
            <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
            {(
              (showRunning
                ? stravaStats.all_run_totals.distance
                : stravaStats.all_ride_totals.distance) /
              1000 /
              ((showRunning
                ? stravaStats.all_run_totals.moving_time
                : stravaStats.all_ride_totals.moving_time) /
                3600)
            ).toFixed(2)}{' '}
            km/h
          </p>
          {showRunning ? 'Running' : 'Biking'} towards 5000km goal
          <progress
            className="mt-2"
            value={
              (showRunning
                ? stravaStats.all_run_totals.distance
                : stravaStats.all_ride_totals.distance) /
              10 /
              5000
            }
            max={100}
          ></progress>
        </div>
        <div className="px-8 py-4 flex flex-col md:w-1/2">
          <h3 className="font-bold text-xl mb-4">
            Most recent {showRunning ? 'run' : 'ride'}
          </h3>
          <p className="mb-3">
            <FontAwesomeIcon icon={faRoad} className="mr-2" />
            {Math.floor(
              (showRunning
                ? stravaMostRecentRun.distance
                : stravaMostRecentRide.distance) / 1000,
            )}
            km
          </p>
          <p className="mb-3">
            <FontAwesomeIcon icon={faMountain} className="mr-2" />
            {showRunning
              ? stravaMostRecentRun.total_elevation_gain
              : stravaMostRecentRide.total_elevation_gain}
            m
          </p>
          <p className="mb-3">
            <FontAwesomeIcon icon={faClock} className="mr-2" />
            {Math.floor(
              (showRunning
                ? stravaMostRecentRun.moving_time
                : stravaMostRecentRide.moving_time) / 3600,
            )}
            h{' '}
            {Math.floor(
              ((showRunning
                ? stravaMostRecentRun.moving_time
                : stravaMostRecentRide.moving_time) %
                3600) /
                60,
            )}
            m
          </p>
          <p className="mb-3">
            <FontAwesomeIcon icon={faTachometerAlt} className="mr-2" />
            {(
              (showRunning
                ? stravaMostRecentRun.distance
                : stravaMostRecentRide.distance) /
              1000 /
              ((showRunning
                ? stravaMostRecentRun.moving_time
                : stravaMostRecentRide.moving_time) /
                3600)
            ).toFixed(2)}{' '}
            km/h
          </p>
        </div>
      </div>
    </div>
  )
}
export default StravaStats
