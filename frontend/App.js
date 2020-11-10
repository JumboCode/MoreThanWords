import React from 'react';
import OutcomesHome from './components/outcomes/OutcomesHome';

class App extends React.Component {  
    render() {
        return (
            <OutcomesHome
                titles={[
                            "Gather Essential Documents for Career Readiness",
                            "Choose a Pathway to Pursue After MTW",
                            "Example Title 1",
                            "Example Title 2",
                            "Example Title 3",
                            "Example Title 4",
                        ]}
            />
        );
    }        
}

export default App;