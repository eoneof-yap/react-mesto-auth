export default function Preloader({ preloaderVisible }) {
  const hiddenClassName = `${preloaderVisible ? '' : 'hidden'}`;

  return (
    <div className={`preloader ${hiddenClassName}`}>
      <div className='spinner'></div>
    </div>
  );
}
