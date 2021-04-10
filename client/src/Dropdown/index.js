import React, * as react from 'react';
import { Grid, ListItem } from '@material-ui/core';
// import { Link } from 'react-router-dom';




const Dropdown = ({ callbackFromParent }) => {
	const node = react.useRef();
	const handleClick = (e) => {
		if (node.current.contains(e.target)) {
			// inside click
			callbackFromParent(true);
			return;
		}
		// outside click
		callbackFromParent(false);
	};

	react.useEffect(() => {
		document.addEventListener('onclick', handleClick);
		return () => {
			document.removeEventListener('onclick', handleClick);
		};
	}, []);

	return (
		<Grid container ref={node}>
			<Grid item xs={12} sm={4} md={4}>
				<h4>Offense</h4>
				<ListItem onClick={() => callbackFromParent(false)}>
				</ListItem>
				<ListItem>3-pointers</ListItem>
                <ListItem>Mid Range</ListItem>
				<ListItem>Up and Under</ListItem>
				<ListItem>Sping and Go</ListItem>
				<ListItem>Glass Cleaner</ListItem>
                                
			</Grid>
			<Grid item xs={12} sm={4} md={4}>
				<h4>Defense</h4>
				<ListItem>1-on-1</ListItem>
				<ListItem>4-Point Closeouts</ListItem>
				<ListItem>Defensive Specialist</ListItem>
				<ListItem>Mass Sliding</ListItem>
                                <ListItem>Pass Denial</ListItem>
			</Grid>
			<Grid item xs={12} sm={4} md={4}>
				<h4>Foul/Certain Situations</h4>
				<ListItem>Foul Shots</ListItem>
				<ListItem>Half Court</ListItem>
				<ListItem>Full Court</ListItem>
			</Grid>
		</Grid>
	);
};

export default Dropdown;