import { Loading } from "../../../components/ui/loading";


const PageLoading = () => {
    return (
        <div className="min-h-[60vh] flex items-center justify-center">
            <Loading message="Loading blog editor..." />
        </div>
    );
};

export default PageLoading;
