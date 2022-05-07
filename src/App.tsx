import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { fetchLaunches } from "./features/launch/launchSlice";

function App() {
	const launch = useAppSelector((state) => state.launch);
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(fetchLaunches());
	}, [dispatch]);
	const { loading, launches, error } = launch;
	console.log(loading, error);
	return (
		<div>
			{launches.map((launch, index) => {
				return (
					<div key={index}>
						<h2>{launch.rocket.rocket_name}</h2>
					</div>
				);
			})}
		</div>
	);
}

export default App;
