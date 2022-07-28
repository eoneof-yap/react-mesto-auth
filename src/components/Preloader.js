export default function Preloader(props) {
  const hiddenClassName = `${props.dataIsLoaded ? 'hidden' : ''}`;

  return (
    <div className={`preloader ${hiddenClassName}`}>
      <div className='spinner'></div>
    </div>
  );
}
