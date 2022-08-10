export default function Preloader({ isVisible }) {
  const hiddenClassName = `${isVisible ? '' : 'hidden'}`;

  return (
    <div className={`preloader ${hiddenClassName}`}>
      <div className='spinner'></div>
    </div>
  );
}
