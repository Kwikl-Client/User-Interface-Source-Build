import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { siteLogo } from '../../../global';
import DashboardCusFooter from '../../global/cusDashFooter';
import ReadTab from './tabs/readTab';
import JoinCommunity from './tabs/joinCommunity';
import TalkToAuthor from './tabs/talkToAuthor';
import SendMessage from './tabs/sendMessage';
import MyAc from './tabs/myAc';
import account from './account.svg';
import BecomeStar from './tabs/becomeAStar';
import community from './community.svg';
import read from './read.svg';
import talk from './talk.svg';
import star from './star.svg';
import read_a from './read_a.svg';
import talk_a from './talk_a.svg';
import star_a from './star_a.svg';
import community_a from './community_a.svg';
import account_a from './account_a.svg';
import message from "./message.svg";
import message_a from "./message_a.svg"
import "./dashboard.css";
import "./newUserDashboard.css";

export default function NewUserDashboard() {
	const navigate = useNavigate();
	const availableTabs = [
		{ name: "Read", activeImg: read_a, inactiveImg: read },
		{ name: "Join the community", activeImg: community_a, inactiveImg: community },
		{ name: "Talk to author", activeImg: talk_a, inactiveImg: talk },
		{ name: "Become a star", activeImg: star_a, inactiveImg: star },
		{ name: "My Account", activeImg: account_a, inactiveImg: account },
		{ name: "Help", activeImg: message_a, inactiveImg: message },

	];
	const [customerDetails, setCustomerDetails] = useState();
	const [selectedTab, setSelectedTab] = useState(availableTabs[0].name);
	useEffect(() => {
		const token = localStorage.getItem('tkn');
		if (!token) {
			navigate('/login');
			return;
		}
		axios
			.get(`http://localhost:7000/customer/verifyTkn/${token}`)
			.then((response) => {
				console.log(response.data);
				setCustomerDetails(response.data.data);
			})
			.catch((err) => {
				console.log(err);
				navigate('/login');
			});
	}, []);

	const renderSeletedTab = () => {
		switch (selectedTab) {
			case availableTabs[0].name:
				return <ReadTab />
			case availableTabs[1].name:
				return <JoinCommunity customerDetails={customerDetails} setCustomerDetails={setCustomerDetails} />
			case availableTabs[2].name:
				return <TalkToAuthor />
			case availableTabs[3].name:
				return <BecomeStar />
			case availableTabs[4].name:
				return <MyAc customerDetails={customerDetails} setCustomerDetails={setCustomerDetails} />
			case availableTabs[5].name:
				return <SendMessage customerDetails={customerDetails} setCustomerDetails={setCustomerDetails} />
			default:
				break;
		}
	}
	const handleLogout = () => {
		localStorage.removeItem('tkn');
		localStorage.removeItem('name');
		navigate('/');
	};

	return (
		<div className='dashboard-container'>
			<header>
				<img className='logout-div' src={siteLogo.logo} alt={siteLogo.alt} onClick={() => navigate('/dashboard')} />
				<div className='logout-div' onClick={handleLogout} style={{ fontWeight: '600', fontSize: '16px' }}>Logout</div>
			</header>
			<main>
				<div className='sideBar'>
					{availableTabs.map((item, ind) => (
						<div key={ind} onClick={() => { setSelectedTab(item.name) }} className={selectedTab === item.name ? 'active' : ''}>
							<img src={selectedTab === item.name ? item.activeImg : item.inactiveImg} alt={item.name.toLowerCase()} />
							<label style={{ color: selectedTab === item.name && "#ff6a61" }}>{item.name}</label>
						</div>
					))}
				</div>
				<div className='sideBarContent-container'>
					{renderSeletedTab()}
				</div>
			</main>
			<DashboardCusFooter />
		</div>
	)
}
