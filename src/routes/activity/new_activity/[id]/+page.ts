import { getIdData } from "$utils/getActivityData";

const defaultData = {
    title: '',
    classification: '합치하는 외부활동',
    date:'',
    location: '',
    memberNum: 0,
    members: [],
    purpose: '',
    content: '',
    images: [],
    id: 0,
}

export const load = async ({params}: any) => {
    const activityData = await getIdData(params.id);
    if (activityData) return activityData
    else {
        defaultData.id = params.id;
        return defaultData;
    }
}