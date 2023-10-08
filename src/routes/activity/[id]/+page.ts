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
    images: []
}


export const load = async ({params}: any) => {
    const activityData = await getIdData(params.id);
    const acceptStatus = {
        status: params.id % 3 -1, // 0:wating / 1: accpet -1: reject
        rejectReason: '활동 목적이 상세하지 않습니다. 또한, 활동 증빙 사진에 동아리원의 얼굴이 모두 등장하지 않습니다. 수정 수 제출 부탁드립니다'
    }
    return activityData ? {
        ...activityData,
        ...acceptStatus
    } : {
       ...defaultData,
       ...acceptStatus
    }
}