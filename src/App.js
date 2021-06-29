import classes from './App.module.scss';
console.log(classes);

function App() {
  return (
    <div className={classes.App}>
      <h1 className = {classes['header']}>H! REACT</h1>
    </div>
  );
}

export default App;
