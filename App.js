import "react-native-gesture-handler";
import Navigation from "./Navigation";
import {AppProvider} from './AppContext';
import Home from "./screens/Home";

export default function App() {
  return(
    <AppProvider>
       <Navigation>
         <Home />
       </Navigation>
    </AppProvider>
  );
}

/*export default function App() {
  return <Navigation />;
}*/