export default function Preloader({ hidePreloader }) {
  const hiddenClassName = `${hidePreloader ? '' : 'hidden'}`;

  return (
    <div className={`preloader ${hiddenClassName}`}>
      <div className='spinner'></div>
    </div>
  );
}
