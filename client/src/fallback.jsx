import Loader from "./loader";

const Fallback = () => {
    return (
        <div>
            {[1, 2, 3].map((x) => (
                <Loader key={x} />
            ))}
        </div>
    );
};

export default Fallback;
