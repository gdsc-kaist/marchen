
export async function getDataList() {
  const dataDir = '/datas/activity-reports.json'; // 데이터 디렉토리의 경로
  try {
    const response = await fetch(dataDir); // 데이터 디렉토리 내의 파일 목록을 얻어옴
    const data = await response.json();
    return data.map(({id, title, classification, memberNum}:{id:string, title:string, classification:string, memberNum:number})=>(
        {id, title, classification, memberNum}
    ))

  } catch (error) {
    console.error('데이터 디렉토리를 읽는 중 오류 발생:', error);
    return [];
  }
}

export async function getIdData(lookId:string) {
    const dataDir = '/datas/activity-reports.json'; // 데이터 디렉토리의 경로
    try {
      const response = await fetch(dataDir); // 데이터 디렉토리 내의 파일 목록을 얻어옴
      const data = await response.json();
      const filterData = data.filter(({id}:{id:string})=>(
          id == lookId
      ));
      if (filterData) return filterData[0];
      else return null;
  
    } catch (error) {
      console.error('데이터 디렉토리를 읽는 중 오류 발생:', error);
      return [];
    }
}