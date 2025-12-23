import { BUTTON } from "../../components"
import { useState } from "react"

export const Agree = ({ agree }) => {
    const [check1, setCheck1] = useState(false);
    const [check2, setCheck2] = useState(false);

    const handleClick = () => {
        agree(true);
    }

    return (
        <div className="w-screen h-screen p-10 gap-10 bg-linear-to-br from-[#DCE2FF] to-[#F4F9FF] grid grid-cols-2 grid-rows-[4fr_1fr]">
            <div className="bg-white px-10 p-5 rounded-3xl text-center overflow-y-auto shadow-[0_4px_4px_1px_rgba(0,0,0,0.08)]">
                <hr />
                <h2 className="text-2xl font-bold">개인정보 수집·이용 동의서</h2>
                <h3>[개인정보처리자]</h3>
                <p>성명: 강우빈</p>
                <p>연락처: 010-9349-6698</p>
                <p>이메일: s25001@gsm.hs.kr</p>
                <hr className="border-dotted" />
                <h3>1) 개인정보 수집·이용 목적</h3>
                <ul>
                    <li>회원가입 및 이용자 식별</li>
                    <li>서비스 운영 및 공지/문의 응대</li>
                    <li>프로젝트/팀 매칭 및 참여자 관리</li>
                    <li>디스코드 DM 등 알림/커뮤니케이션 제공</li>
                </ul>
                <hr className="border-dotted" />
                <h3>2) 수집하는 개인정보 항목 (필수)</h3>
                <p>이름, 학번, 이메일, 디스코드 고유 ID</p>
                <hr className="border-dotted" />
                <h3>3) 개인정보 보유 및 이용 기간</h3>
                <p>
                    회원 탈퇴 시까지 보유·이용하며, 탈퇴(또는 목적 달성) 후 지체 없이 파기합니다.
                </p>
                <hr className="border-dotted" />
                <h3>4) 동의 거부 권리 및 동의 거부 시 불이익</h3>
                <p>
                    정보주체는 개인정보 수집·이용에 대한 동의를 거부할 권리가 있습니다.<br />
                    다만, 필수 항목 수집·이용에 동의하지 않을 경우 회원가입/서비스 이용(팀 매칭, 안내 등)이 제한될 수 있습니다.
                </p>
                <hr />
                <div className="flex flex-row justify-center gap-3">
                    <p>본인은 위 내용을 충분히 확인하였으며, 개인정보 수집·이용에 동의합니다.</p><input type="checkbox" checked={check1} onChange={(e) => setCheck1(e.target.checked)}/>
                </div>
            </div>

            <div className="bg-white px-10 p-5 rounded-l-3xl text-center overflow-y-auto shadow-[0_4px_4px_1px_rgba(0,0,0,0.08)]">
                <hr />
                <h2 className="text-2xl font-bold">서비스 이용약관</h2>
                <p>
                    본 약관은 M&M의 이용과 관련하여,
                    개인정보처리자(운영자) 강우빈과 이용자 간의 권리·의무 및 책임사항,
                    기타 필요한 사항을 규정함을 목적으로 합니다.
                </p>
                <h3>[운영자 정보]</h3>
                <p>서비스/단체명: M&M</p>
                <p>운영자(성명): 강우빈</p>
                <p>연락처: 010-9349-6698</p>
                <p>이메일: s25001@gsm.hs.kr</p>
                <hr className="border-dotted" />
                <h3>제1조 (목적)</h3>
                <p>
                    본 약관은 서비스 이용 조건, 절차, 운영자와 이용자의 권리·의무 및 책임사항을 정하는 것을 목적으로 합니다.
                </p>
                <hr className="border-dotted" />
                <h3>제2조 (정의)</h3>
                <ol>
                    <li>“서비스”란 운영자가 제공하는 웹사이트 및 관련 기능(팀/프로젝트 참가 요청, DM 전송, 알림 등)을 말합니다.</li>
                    <li>“이용자”란 본 약관에 동의하고 서비스를 이용하는 회원 및 비회원을 말합니다.</li>
                    <li>“회원”이란 서비스에 가입하여 계정을 부여받고 서비스를 이용하는 자를 말합니다.</li>
                    <li>“계정”이란 회원 식별 및 서비스 이용을 위하여 회원이 설정한 정보(이메일 등)를 말합니다.</li>
                    <li>“게시물”이란 회원이 서비스에 게시·등록하는 프로젝트 팀, 스터디 등 일체의 정보를 말합니다.</li>
                </ol>
                <hr className="border-dotted" />
                <h3>제3조 (약관의 효력 및 변경)</h3>
                <ol>
                    <li>본 약관은 서비스 화면에 게시하거나 기타 방법으로 공지함으로써 효력이 발생합니다.</li>
                    <li>운영자는 관련 법령을 위반하지 않는 범위에서 약관을 변경할 수 있습니다.</li>
                    <li>약관이 변경되는 경우, 운영자는 적용일자 및 변경사유를 명시하여 적용일자 이전에 공지합니다.</li>
                    <li>이용자가 변경 약관에 동의하지 않는 경우, 서비스 이용을 중단하고 회원 탈퇴를 할 수 있습니다.</li>
                </ol>
                <hr className="border-dotted" />
                <h3>제4조 (회원가입 및 계정 관리)</h3>
                <ol>
                    <li>회원가입은 이용자가 약관 및 개인정보 수집·이용 동의에 동의하고, 운영자가 정한 절차에 따라 신청함으로써 성립합니다.</li>
                    <li>회원은 계정 정보를 정확하게 유지해야 하며, 타인의 정보를 도용하거나 허위 정보를 제공해서는 안 됩니다.</li>
                    <li>계정의 관리 책임은 회원에게 있으며, 계정 도용 등 문제가 발생한 경우 즉시 운영자에게 알려야 합니다.</li>
                </ol>
                <hr className="border-dotted" />
                <h3>제5조 (개인정보 보호)</h3>
                <p>
                    운영자는 개인정보 보호를 위해 관련 법령 및 서비스의 개인정보 수집·이용 동의서(또는 개인정보 처리방침)를 따릅니다.
                    개인정보의 처리에 관한 상세 내용은 별도 게시되는 문서에 따릅니다.
                </p>
                <hr className="border-dotted" />
                <h3>제6조 (서비스 제공 및 변경)</h3>
                <ol>
                    <li>운영자는 서비스의 제공 내용(기능, 화면, 정책 등)을 운영상·기술상 필요에 따라 변경할 수 있습니다.</li>
                    <li>중대한 변경이 있는 경우, 운영자는 사전에 공지하도록 노력합니다.</li>
                </ol>
                <hr className="border-dotted" />
                <h3>제7조 (서비스 이용의 제한 및 중단)</h3>
                <ol>
                    <li>운영자는 점검, 장애, 천재지변, 기타 불가항력 사유가 있는 경우 서비스 제공을 일시적으로 중단할 수 있습니다.</li>
                    <li>운영자는 서비스 중단이 필요한 경우 사전에 공지하도록 노력하되, 긴급한 경우 사후 공지할 수 있습니다.</li>
                </ol>
                <hr className="border-dotted" />
                <h3>제8조 (이용자의 의무)</h3>
                <ol>
                    <li>이용자는 관련 법령, 본 약관, 운영자가 공지한 사항을 준수해야 합니다.</li>
                    <li>이용자는 서비스 이용 과정에서 타인의 권리를 침해하거나 불쾌감을 주는 행위를 해서는 안 됩니다.</li>
                </ol>
                <hr className="border-dotted" />
                <h3>제9조 (금지행위)</h3>
                <ol>
                    <li>타인의 개인정보 또는 계정 도용, 사칭 행위</li>
                    <li>불법 정보 게시, 욕설·혐오·차별 표현 사용 등 타인에게 피해를 주는 행위</li>
                    <li>서비스의 정상 운영을 방해하는 행위(과도한 요청, 취약점 악용 등)</li>
                    <li>기타 운영자가 합리적으로 부적절하다고 판단하는 행위</li>
                </ol>
                <hr className="border-dotted" />
                <h3>제10조 (게시물의 관리)</h3>
                <ol>
                    <li>게시물에 대한 책임은 이를 게시한 이용자에게 있습니다.</li>
                    <li>
                        운영자는 다음에 해당하는 게시물에 대해 사전 통지 없이 삭제·이동·차단 등의 조치를 할 수 있습니다:
                        불법, 권리침해, 명예훼손, 개인정보 노출, 광고/스팸, 욕설·괴롭힘, 운영 방해 목적의 게시물 등
                    </li>
                </ol>
                <hr className="border-dotted" />
                <h3>제11조 (권리의 귀속)</h3>
                <ol>
                    <li>서비스 및 관련 콘텐츠(로고, UI, 기능 등)에 대한 권리는 운영자에게 귀속됩니다(이용자 게시물 제외).</li>
                    <li>이용자가 게시한 게시물의 저작권은 이용자에게 귀속되며, 운영자는 서비스 제공 및 운영 목적 범위에서 이를 노출·전송할 수 있습니다.</li>
                </ol>
                <hr className="border-dotted" />
                <h3>제12조 (회원 탈퇴 및 이용 제한)</h3>
                <ol>
                    <li>회원은 언제든지 서비스 내 제공되는 방법으로 탈퇴를 요청할 수 있으며, 운영자는 특별한 사정이 없는 한 이를 처리합니다.</li>
                    <li>운영자는 이용자가 본 약관을 위반한 경우 경고, 게시물 제한, 일정 기간 이용 정지, 계정 해지 등의 조치를 할 수 있습니다.</li>
                </ol>
                <hr className="border-dotted" />
                <h3>제13조 (면책)</h3>
                <ol>
                    <li>운영자는 천재지변, 장애, 이용자 귀책 사유로 인한 서비스 이용 장애에 대해 책임을 지지 않습니다.</li>
                    <li>운영자는 이용자 간 또는 이용자와 제3자 간 분쟁에 개입하지 않으며, 이에 대한 책임을 지지 않습니다.</li>
                </ol>
                <hr className="border-dotted" />
                <h3>제14조 (손해배상)</h3>
                <p>
                    이용자가 본 약관을 위반하여 운영자 또는 제3자에게 손해를 발생시킨 경우, 이용자는 그 손해를 배상할 책임이 있습니다.
                </p>
                <hr className="border-dotted" />
                <h3>제15조 (분쟁 해결 및 관할)</h3>
                <p>
                    본 약관과 관련하여 분쟁이 발생할 경우, 운영자와 이용자는 원만한 해결을 위해 성실히 협의합니다.
                    협의로 해결되지 않을 경우, 둘 다 서비스 이용 정지 처분을 받습니다.
                </p>
                <hr />
                <p>시행일: 2025년 12월 19일</p>
                <div className="flex flex-row justify-center gap-3">
                    <p>본인은 위 내용을 충분히 확인하였으며, 서비스 이용약관에 동의합니다.</p><input type="checkbox" checked={check2} onChange={(e) => setCheck2(e.target.checked)}/>
                </div>
            </div>
            <div className="flex justify-center items-center px-80 col-span-2">
                <BUTTON
                    label={"개인정보 수집·이용에 동의합니다"}
                    activate={check1 && check2}
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}