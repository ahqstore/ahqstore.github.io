export default function Loading() {
  return (
    <div className="flex flex-col">
      <img className="user-loading" src="/loading.svg" />
      <h6 className="mx-auto" style={{ fontWeight: "50" }}>
        Thanks to loading.io for the animation
      </h6>
    </div>
  );
}
