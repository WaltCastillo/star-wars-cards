import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Single = props => {
	const { store, actions } = useContext(Context);
	useEffect(
		() => {
			actions.getItem(props.match.params.thetype, props.match.params.theid);
		},
		[props.match.params.theid]
	);
	return (
		<>
			{"name" in store.single &&
				props.match.params.theid == store.single.url.match(/[/][0-9]+[/]/)[0].replace(/[/]/g, "") && (
					<div className="jumbotron">
						<div className="d-flex">
							<img
								className="card-img-top"
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6ehXBt4FfKXFljzNfQ3vZquqayndyhKoPSg&usqp=CAU"
								alt="Card image cap"
							/>
							<div className="d-flex flex-column ml-4">
								<h1 className="display-4">{store.single.name}</h1>
								<p className="lead">
									{
										"Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo"
									}
								</p>
							</div>
						</div>
						<hr className="my-4 red-saber" />
						{/* loop through object properties to create divs */}
						<div className="d-flex flex-wrap center-text">
							{Object.entries(store.single).map(([key, value], index) => {
								if (
									value.toString().search("http") == -1 &&
									key != "name" &&
									key != "created" &&
									key != "edited" &&
									value.toString() != ""
								) {
									let propertyName = key.replace(/_/g, " ");
									return (
										<div className="d-flex flex-column ml-5 mr-5" key={index}>
											<p className="property-under">{`${propertyName.charAt(0).toUpperCase() +
												propertyName.slice(1)}`}</p>
											<p>{`${value}`}</p>
										</div>
									);
								}
							})}
						</div>
					</div>
				)}
		</>
	);
};

Single.propTypes = {
	match: PropTypes.objects
};
