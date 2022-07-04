import { useEffect } from 'react';
import '../Landing.css';
import Nav from '../Nav/Nav';

export default function Pricing () {
    function scrollTo(to: string) {
		const section = document.querySelector(to);
		section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};
    useEffect(() => {
        scrollTo('#price-top');
    },[])
    return (
        <>
            <Nav/>
            <section className='price_section' id='price-top'>
                <div className='title'>
                    <div className='title_box'>
                        ጥቅሎች
                    </div>
                    <div className="toggle_price">
                        <span id='mth' className='active_toggle_mth'>ወርሀዊ</span>
                        <span id='yr'>አመታዊ</span>
                    </div>
                </div>
                <div className='cards_prices'>
                    <div className="price_card white">
                        <span className="cut_out"></span>
                        <div className="card_content">
                            <div className="card_title">Free Trial</div>
                            <ul className="card_list">
                                <li className="card_list_item">1 Project</li>
                                <li className="card_list_item">2 Surveys</li>
                                <li className="card_list_item">3 Members</li>
                                <li className="card_list_item">50 Responses</li>
                                <li className="card_list_item">30 Days</li>
                            </ul>
                            <div className="card_title">Free</div>
                        </div>
                    </div>
                    <div className="price_card black op-3">
                        <span className="cut_out"></span>
                        <div className="card_content">
                            <div className="card_title">Basic</div>
                            <ul className="card_list">
                                <li className="card_list_item">TBD</li>
                                <li className="card_list_item">TBD</li>
                                <li className="card_list_item">TBD</li>
                                <li className="card_list_item">TBD</li>
                                <li className="card_list_item">TBD</li>
                            </ul>
                            <div className="card_title">TBD</div>
                        </div>
                    </div>
                    <div className="price_card black op-3">
                        <span className="cut_out"></span>
                        <div className="card_content">
                            <div className="card_title">Standard</div>
                            <ul className="card_list">
                                <li className="card_list_item">TBD</li>
                                <li className="card_list_item">TBD</li>
                                <li className="card_list_item">TBD</li>
                                <li className="card_list_item">TBD</li>
                                <li className="card_list_item">TBD</li>
                            </ul>
                            <div className="card_title">TBD</div>
                        </div>
                    </div>
                    <div className="price_card purple op-3">
                        <span className="cut_out"></span>
                        <div className="card_content">
                            <div className="card_title">Premium</div>
                            <ul className="card_list">
                                <li className="card_list_item">TBD</li>
                                <li className="card_list_item">TBD</li>
                                <li className="card_list_item">TBD</li>
                                <li className="card_list_item">TBD</li>
                                <li className="card_list_item">TBD</li>
                            </ul>
                            <div className="card_title">TBD</div>
                        </div>
                    </div>
                    <div className="price_card yellow op-3">
                        <span className="cut_out"></span>
                        <div className="card_content">
                            <div className="card_title">Enterprise</div>
                            <ul className="card_list">
                                <li className="card_list_item">TBD</li>
                                <li className="card_list_item">TBD</li>
                                <li className="card_list_item">TBD</li>
                                <li className="card_list_item">TBD</li>
                                <li className="card_list_item">TBD</li>
                            </ul>
                            <div className="card_title">TBD</div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}