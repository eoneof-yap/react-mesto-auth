export default function Preloader({ preloaderIsVisible }) {
  const hiddenClassName = `${preloaderIsVisible ? '' : 'hidden'}`;

  return (
    <div className={`preloader ${hiddenClassName}`}>
      <div className='spinner'></div>
    </div>
  );
}
