import style from './styles/component1.module.css';
const Component1 = () => {
    return (
        <div className={` ${style.testClass} `}>
            test component1
        </div>
    );
};

export default Component1;