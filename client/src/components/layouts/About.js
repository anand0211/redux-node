import React, { Component} from 'react';

class About extends Component {
	render(){
		return (
			<div>
		
		<div className="w3l_banner_nav_right">
		<div className="privacy about">
			<h3>About Us</h3>
			<p className="animi">At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis 
				praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias 
				excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui 
				officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem 
				rerum facilis est et expedita distinctio.</p>
			<div className="agile_about_grids">
				<div className="col-md-6 agile_about_grid_right">
					<img src="images/31.jpg" alt=" " className="img-responsive" />
				</div>
				<div className="col-md-6 agile_about_grid_left">
					<ol>
						<li>laborum et dolorum fuga</li>
						<li>corrupti quos dolores et quas</li>
						<li>est et expedita distinctio</li>
						<li>deleniti atque corrupti quos</li>
						<li>excepturi sint occaecati cupiditate</li>
						<li>accusamus et iusto odio</li>
					</ol>
				</div>
				<div className="clearfix"> </div>
			</div>
		</div>
		</div>
		<div className="clearfix"></div>
			</div>
		)
	}
}

export default About;