import { getKcClsx } from "keycloakify/login/lib/kcClsx";
import { PageProps } from "keycloakify/login/pages/PageProps";
import { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import "../overrides.css";

export default function LoginOauthGrant(props: PageProps<Extract<KcContext, { pageId: "login-oauth-grant.ftl" }>, I18n>) {
    const { kcContext, i18n, doUseDefaultCss, classes, Template } = props;
    const { url, oauth, client } = kcContext;

    const { msg, msgStr, advancedMsg, advancedMsgStr } = i18n;

    const { kcClsx } = getKcClsx({
        doUseDefaultCss,
        classes
    });

    const getAgeVerificationText = (operator: string, age: string): string => {
        const operatorMap = {
            gte: `at least ${age} years old`,
            lte: `maximum ${age} years old`,
            gt: `older than ${age} years`,
            lt: `younger than ${age} years`,
            eq: `exactly ${age} years old`
        };

        const operatorText = operatorMap[operator as keyof typeof operatorMap] || `${operator} ${age}`;
        return `Whether you are ${operatorText}`;
    };

    return (
        <Template
            kcContext={kcContext}
            i18n={i18n}
            doUseDefaultCss={doUseDefaultCss}
            classes={classes}
            bodyClassName="oauth"
            headerNode={
                <>
                    {client.attributes.logoUri && <img src={client.attributes.logoUri} className="w-16 h-16 object-contain mx-auto" />}
                    <p className="text-center lg:mb-8 mb-4">
                        {client.name ? msg("oauthGrantTitle", advancedMsgStr(client.name)) : msg("oauthGrantTitle", client.clientId)}
                    </p>
                </>
            }
        >
            <div id="kc-oauth" className="content-area">
                <h3>{msg("oauthGrantRequest", advancedMsgStr(client.name ?? client.clientId))}</h3>
                <ul className="list shadow-sm w-full my-4">
                    {oauth.clientScopesRequested.map(clientScope => {
                        // Check if this has a dynamic age parameter
                        if (clientScope.consentScreenText === "age:" && clientScope.dynamicScopeParameter) {
                            const match = clientScope.dynamicScopeParameter.match(/^(gte|lte|gt|lt|eq):(\d+)$/);

                            if (match) {
                                const [, operator, age] = match;
                                return (
                                    <li key={`age-${operator}-${age}`} className="list-row w-full">
                                        {getAgeVerificationText(operator, age)}
                                    </li>
                                );
                            }
                        }

                        return (
                            <li key={clientScope.consentScreenText} className="list-row w-full">
                                {advancedMsg(clientScope.consentScreenText)}
                            </li>
                        );
                    })}
                </ul>

                {(client.attributes.policyUri || client.attributes.tosUri) && (
                    <p className="text-sm text-base-content/70 lg:text-balance">
                        {client.name ? msg("oauthGrantInformation", advancedMsgStr(client.name)) : msg("oauthGrantInformation", client.clientId)}{" "}
                        {msg("oauthGrantReview")}
                        {client.attributes.tosUri && (
                            <>
                                <a href={client.attributes.tosUri} target="_blank" rel="noreferrer" className="link">
                                    {msg("oauthGrantTos")}
                                </a>
                            </>
                        )}
                        {client.attributes.policyUri && (
                            <>
                                {client.attributes.tosUri && " and "}
                                <a href={client.attributes.policyUri} target="_blank" rel="noreferrer" className="link">
                                    {msg("oauthGrantPolicy")}
                                </a>
                            </>
                        )}
                        .
                    </p>
                )}

                <form className="form-actions" action={url.oauthAction} method="POST">
                    <input type="hidden" name="code" value={oauth.code} />
                    <div className={kcClsx("kcFormGroupClass")}>
                        <div id="kc-form-options">
                            <div className={kcClsx("kcFormOptionsWrapperClass")}></div>
                        </div>

                        <div id="kc-form-buttons">
                            <div className={kcClsx("kcFormButtonsWrapperClass")}>
                                <input
                                    className={kcClsx("kcButtonClass", "kcButtonPrimaryClass", "kcButtonLargeClass")}
                                    name="accept"
                                    id="kc-login"
                                    type="submit"
                                    value={msgStr("doYes")}
                                />
                                <input
                                    className={kcClsx("kcButtonClass", "kcButtonDefaultClass", "kcButtonLargeClass")}
                                    name="cancel"
                                    id="kc-cancel"
                                    type="submit"
                                    value={msgStr("doNo")}
                                />
                            </div>
                        </div>
                    </div>
                </form>
                <div className="clearfix"></div>
            </div>
        </Template>
    );
}
