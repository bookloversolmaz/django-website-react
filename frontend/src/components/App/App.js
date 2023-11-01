// import axios from 'axios';
import React from 'react';
import ToDo from '../todo/todo';


const App = () => {
  return (
    <div classname = "App">
      <ToDo/>
    </div>


    // <Routes>
    //   <Route path="/signup/collector" element={<SignUpForm navigate={useNavigate()} />} />
    //   <Route path="/signup/donator" element={<DonatorSignUpForm navigate={useNavigate()} />} />
    //   <Route path="/login/collector" element={<LoginCollector navigate={useNavigate()} />} />
    //   <Route path="/login/donator" element={<LoginDonator navigate={useNavigate()} />} />
    //   <Route path="/foodhero/:id" element={<DonatorFeed navigate={useNavigate()} />} />
    //   <Route path="/foodrescuer/:id" element={<CollectorFeed navigate={useNavigate()} />} />
    //   <Route path="/about" element={<About navigate={useNavigate()} />} />
    //   <Route path="/:id/account" element={<DonatorAccount navigate={useNavigate()} />} />
    //   <Route path ="/:id/account" element={<CollectorAccount navigate={useNavigate()} />} />
    // </Routes>
  );
};


export default App;

  