function LoadingScreen() {
    return (
      <div className="loading-screen">
        <h2>Loading...</h2>
        <div className="loading-indicator"></div>
      </div>
    );
  }
  
  function App() {
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      // perform async task or fetch data here
      // set isLoading to false when done
      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    }, []);
  
    return (
      <div className="app">
        {isLoading ? (
          <LoadingScreen />
        ) : (
          <div>
            <h1>My App</h1>
            {/* other app content */}
          </div>
        )}
      </div>
    );
  }